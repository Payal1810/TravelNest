import React, { useEffect, useReducer, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const initialState = {
    price: '',
    count: '',
    hid: '',
    rtype: '', // Changed from roomtype to rtype to match API data
    errors: {
        priceerr: '',
        counterr: '',
        hiderr: '',
        rtypeerr: '',
    }
};

function reducer(state, action) {
    switch (action.type) {
        case 'update':
            return {
                ...state,
                [action.fld]: action.val
            };
        case 'setError':
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.fld]: action.val
                }
            };
        case 'reset':
            return initialState;
        default:
            return state;
    }
}

const validatePrice = (price) => {
    return price && !isNaN(price) ? "" : "Price must be a valid number.";
};
const validateCount = (count) => {
    return count && !isNaN(count) ? "" : "Count must be a valid number.";
};

export default function AddRoom() {
    const [room, dispatch] = useReducer(reducer, initialState);
    const [msg, setMsg] = useState("");
    const [roomOptions, setRoomOptions] = useState([]);
    const [file, setFile] = useState(null);
    const [errors, setErrors] = useState(initialState.errors);

    const navigate = useNavigate();

    useEffect(() => {
        // fetch("https://localhost:7090/api/UserManagement/GetCity")
        //     .then(response => response.json())
        //     .then(data => {
        //         // Ensure data is in the format [{ CityId: number, Cname: string }]
        //         const cityOptions = data.map(city => ({
        //             id: city.cityId,
        //             name: city.cname
        //         }));
        //         // console.log("Processed city options:", cityOptions);
        //         // Handle city options if needed
        //     })
        //     .catch(error => console.error('Error fetching cities:', error));



        fetch('http://localhost:8080/getRoomTypes')
        .then(response => response.json())
            .then(data => {
                // Ensure data is in the format [{ RoomId: number, RoomName: string }]
                const roomOptions = data.map(room => ({
                    rid: room.rid,
                    type_name: room.type_name
                }));
                console.log(roomOptions)
                setRoomOptions(roomOptions);
            })
            .catch(error => {
                console.error('Error fetching room types:', error);
                setMsg('Failed to fetch room types. Please try again.');
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`Handling change for ${name} with value ${value}`);
        dispatch({ type: 'update', fld: name, val: value });
        validateForm();
    };

    const validateForm = () => {
        const errors = {
            priceerr: room.price ? validatePrice(room.price) : "Price is required.",
            counterr: room.count ? validateCount(room.count) : "Count is required.",
            hiderr: room.hid ? "" : "Hotel ID is required.",
            rtypeerr: room.rtype ? "" : "Room Type is required."
        };
        Object.keys(errors).forEach(key => {
            dispatch({ type: 'setError', fld: key, val: errors[key] });
        });
        setErrors(errors);
        return Object.values(errors).every(error => error === "");
    };

    const submitHandle = (e) => {
        e.preventDefault();
        console.log("Submitting form with data:", room);

        if (validateForm()) {
            const sendData = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    price: room.price,
                    count: room.count,
                    hid: room.hid,
                    rtype: room.rtype,
                })
            };
            console.log(sendData);
            fetch("http://localhost:8080/addRoom", sendData)
                .then(resp => resp.json())
                .then(obj => {
                    setMsg("Room added successfully.")
                     const fd= new FormData();
                    fd.append("file",file);
                    const reqOptions1={
                        method:"POST",
                        body:fd
                    }
                    fetch("http://localhost:8080/uploadImage/"+obj.room_id,reqOptions1)
                    .then(resp=>resp.json())
                    .then(obj=>{
                        if(obj){
                            alert("Request successfull");
                            navigate("/");
                        }
                        else{
                            alert("Request unsuccessfull");
                            navigate("/");
                        }
                        

                    })
                })
                .catch(error => {
                    console.error('Error:', error);
                    setMsg(error.message);
                });
        }
    };

    return (
        <div>
            <div className="room-container d-flex justify-content-center align-items-center min-vh-100">
                <div className="bg-light p-4 mt-5 rounded shadow-lg border" style={{ maxWidth: '500px', width: '100%' }}>
                    <h1 className="text-center text-primary mb-3">Add Room</h1>
                    <form onSubmit={submitHandle} className="p-3">
                        <table>
                            <tbody>
                                <tr>
                                    <td colspan='2' style={{ paddingRight: '5px' }}>
                                        <div className="mb-3">
                                            <label htmlFor="price" className="form-label">Price:</label>
                                            <input type="text" className="form-control" id="price" name="price" value={room.price}
                                                onChange={handleChange} />
                                            <div id="priceerr" className="form-text text-danger">{errors.priceerr}</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ paddingLeft: '3px' }}>
                                        <div className="mb-3">
                                            <label htmlFor="count" className="form-label">Count:</label>
                                            <input type="text" className="form-control" id="count" name="count" value={room.count}
                                                onChange={handleChange} />
                                            <div id="counterr" className="form-text text-danger">{errors.counterr}</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ paddingRight: '5px' }}>
                                        <div className="mb-3">
                                            <label htmlFor="hid" className="form-label">Hotel ID:</label>
                                            <input type="text" className="form-control" id="hid" name="hid" value={room.hid}
                                                onChange={handleChange} />
                                            <div id="hiderr" className="form-text text-danger">{errors.hiderr}</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ paddingRight: '5px' }}>
                                        <div className="mb-3">
                                            <label htmlFor="rtype" className="form-label">Room Type:</label>
                                            <select className="form-control" id="rtype" name="rtype" value={room.rtype} onChange={handleChange}>
                                                <option value="" disabled>Select an option</option>
                                                {roomOptions.map(option => (
                                                    <option key={option.rid} value={option.rid}>{option.type_name}</option>
                                                ))}
                                            </select>
                                            <div id="rtypeerr" className="form-text text-danger">{errors.rtypeerr}</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ paddingRight: '5px' }}>
                                        <div className="mb-3">
                                            <label htmlFor="image" className="form-label">Upload image:</label>
                                            <input type="file" className="form-control" id="image" name="image"  onChange={(e)=>setFile(e.target.files[0])}/>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <Button type="submit" className="btn btn-primary mb-3">Submit</Button>
                        <Button type="button" className="btn btn-secondary mb-3" onClick={() => dispatch({ type: 'reset' })}>Clear</Button>
                    </form>
                    <span>{msg}</span>
                    
                </div>
            </div>
        </div>
    );
}
