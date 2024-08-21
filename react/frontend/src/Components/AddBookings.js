import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function AddBookings() {
  const location = useLocation();
  const { hotelId } = location.state || 0;
  const { hotelPrice } = location.state || 0;
  const { room_id } = useParams(); // Extract the
  console.log("hotelPrice type", typeof hotelPrice);

  const [msg, setMsg] = useState("");
  const [car_id, setCardId] = useState(0);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [cost, setCost] = useState(hotelPrice);
  console.log("cost type", typeof cost);
  const [paid, setPaid] = useState("");
  const [cityOptions, setCityOptions] = useState([]);
  const [daysDifference, setDaysDifference] = useState(1);
  const todayDate = new Date().toISOString().split("T")[0];

  const calculateDifference = () => {
    console.log(" diff func called");
    const date1 = new Date(checkin);
    console.log(" date1 value i s ", date1);
    const date2 = new Date(checkout);
    console.log(" date2value i s ", date2);
    const timeDifference = date2.getTime() - date1.getTime();
    console.log(" timeDifference value i s ", timeDifference);

    const daysDifference = timeDifference / (1000 * 3600 * 24); // Convert milliseconds to days
    console.log(" diff value i s ", daysDifference);
    setDaysDifference(daysDifference);
  };

  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  const cust_id = loggedUser ? loggedUser?.userId : 0;
  useEffect(() => {
    ///fetch for car_id setCardId
    fetch(`http://localhost:8080/getCarsByhotel?hotelId=${hotelId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(" data", data);
        const cityOptions = data.map((city) => ({
          id: city.ctype.cid,
          name: city.ctype.type_name,
        }));
        setCityOptions(cityOptions);
        console.log("in ctiy options", cityOptions);
      })
      .catch((error) => console.error("Error fetching cars:", error));
  }, []);

  useEffect(() => {
    calculateDifference();
  }, [checkin, checkout]);

  useEffect(() => {
    if (cost > 0 && daysDifference > 0) {
      setCost(cost * daysDifference);
    }
  }, [daysDifference]);

  useEffect(() => {
    if (car_id > 0) {
      fetch(`http://localhost:8080/getCarsByHotelAndCarType?cid=${car_id}&hid=${hotelId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(" data", data);
          setCost(cost + data[0].price)})
          .catch((error) =>
            console.error("Error fetching cars:", error)
          );
        ;
    }
  }, [car_id]);

  const submitHandle = (e) => {
    e.preventDefault();

    const sendData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        room_id,
        car_id,
        cust_id,
        cost,
        paid,
        checkin,
        checkout,
      }),
    };
    console.log("finadal data", sendData);
    fetch("http://localhost:8080/addBooking", sendData)
        .then(resp => resp.json())
        .then(obj => {
            setMsg("Room Booked successfully.")

        })
        .catch(error => {
            console.error('Error:', error);
            setMsg(error.message);
        });
  };

  return (
    <div>
      <div className="room-container d-flex justify-content-center align-items-center min-vh-100">
        <div
          className="bg-light p-4 mt-5 rounded shadow-lg border"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          <h1 className="text-center text-primary mb-3">Book Room</h1>
          <form onSubmit={submitHandle} className="p-3">
            <table>
              <tbody>
                <tr>
                  <td colspan="2" style={{ paddingRight: "5px" }}>
                    <div className="mb-3">
                      <label htmlFor="price" className="form-label">
                        Check-in Date:{" "}
                      </label>
                      <input
                        type="date"
                        min={todayDate}
                        value={checkin}
                        className="form-control"
                        onChange={(e) => {
                          setCheckin(e.target.value);
                          if (checkout && e.target.value > checkout) {
                            setCheckout(""); // Reset checkout if it becomes invalid
                          }
                        }}
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "3px" }}>
                    <div className="mb-3">
                      <label htmlFor="count" className="form-label">
                        {" "}
                        Check-out Date:
                      </label>
                      <input
                        disabled={!checkin}
                        type="date"
                        min={checkin || todayDate}
                        value={checkout}
                        className="form-control"
                        onChange={(e) => setCheckout(e.target.value)}
                      />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style={{ paddingRight: "3px" }}>
                    <div className="mb-3">
                      <label htmlFor="cars" className="form-label">
                        Cars:
                      </label>
                      <select
                        className="form-control"
                        id="cars"
                        name="cars"
                        value={cityOptions.id}
                        onChange={(e) => setCardId(e.target.value)}
                      >
                        <option value="">Select an option</option>
                        {cityOptions.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingRight: "5px" }}>
                    <div className="mb-3">
                      <label htmlFor="hid" className="form-label">
                        Total Cost
                      </label>
                      <input
                        type="text"
                        disabled
                        className="form-control"
                        id="cost"
                        name="cost"
                        value={cost}
                      />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style={{ paddingRight: "5px" }}>
                    <div className="mb-3">
                      <label className="form-label">Paid</label>
                      <input
                        type="number"
                        className="form-control"
                        name="paid"
                        onChange={(e) => setPaid(e.target.value)}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <Button type="submit" className="btn btn-primary mb-3">
              Submit
            </Button>
            <Button
              type="button"
              className="btn btn-secondary mb-3"
              onClick={() => {
                setCheckout("");
                setCheckin("");
                setPaid("");
              }}
            >
              Clear
            </Button>
          </form>
          <span>{msg}</span>
        </div>
      </div>
    </div>
  );
}
