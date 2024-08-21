import { useState, useEffect } from "react";

export default function ApproveHotel() {
    const [hotels, setHotels] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchHotels();
    }, []);

    // Fetch the hotels data from your API
    const fetchHotels = async () => {
        try {
            const response = await fetch("http://localhost:8080/hotels"); // Adjust the URL as needed
            const data = await response.json();
            console.log("Fetched hotels data:", data);
            setHotels(data);
        } catch (error) {
            console.error("Error fetching hotels:", error);
        }
    };

    const handleApprove = async (hotelId) => {
        try {
            console.log("phase 1");
            const response = await fetch(`http://localhost:8080/updateHotelStatus/${hotelId}`, {
            method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ hotelId }),
            });

            if (response.ok) {
                setMessage("Hotel approved");
                fetchHotels(); // Refresh the list
            } else {
                setMessage("Error approving hotel");
            }
        } catch (error) {
            console.error("Error approving hotel:", error);
        }
    };

    const handleDeny = async (hotelId) => {
        try {
            
            const response = await fetch(`http://localhost:8080/deleteHotel/${hotelId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setMessage("Hotel denied");
                setHotels(hotels.filter(hotel => hotel.hid !== hotelId)); // Remove from UI
            } else {
                setMessage("Error denying hotel");
            }
        } catch (error) {
            console.error("Error denying hotel:", error);
        }
    };

    return (
        <div className="container">
            <h2>Approve Hotels</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Hotel Name</th>
                        <th>Contact</th>
                        <th>License No.</th>
                        <th>Area</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {hotels.map(hotel => (
                        <tr key={hotel.hid}>
                            <td>{hotel.hname}</td>
                            <td>{hotel.contact}</td>
                            <td>{hotel.licenseno}</td>
                            <td>{hotel.area ? hotel.area.aname : "N/A"}</td> 
                            <td>{hotel.address}</td>
                            <td>
                                <button
                                    className="btn btn-success"
                                    onClick={() => handleApprove(hotel.hid)}
                                >
                                    Approve
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDeny(hotel.hid)}
                                >
                                    Deny
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {message && <p>{message}</p>}
        </div>
    );
}
