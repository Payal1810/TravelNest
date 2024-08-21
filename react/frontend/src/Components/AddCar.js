import React, { useEffect, useReducer, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const initialState = {
    price: '',
    count: '',
    hid: '',
    cartype: '', // Changed from roomtype to cartype to match API data
    sid:'',
    errors: {
        priceerr: '',
        counterr: '',
        hiderr: '',
        cartypeerr: '',
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

export default function AddCar() {
    const [car, dispatch] = useReducer(reducer, initialState);
    const [msg, setMsg] = useState("");
    const [carOptions, setCarOptions] = useState([]);
    const [sourceOptions, setSourceOptions] = useState([]);
    const [file, setFile] = useState(null);
    const [errors, setErrors] = useState(initialState.errors);

    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/getCarTypes')
        .then(response => response.json())
            .then(data => {
                
                const carOptions = data.map(car => ({
                    cid: car.cid,
                    type_name: car.type_name
                }));
                setCarOptions(carOptions);
            })
            .catch(error => {
                console.error('Error fetching car types:', error);
                setMsg('Failed to fetch car types. Please try again.');
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/getSource')
        .then(response => response.json())
            .then(data => {
                
                const sourceOptions = data.map(car => ({
                    sid: car.sid,
                    sourcename: car.sourcename
                }));
                setSourceOptions(sourceOptions);
            })
            .catch(error => {
                console.error('Error fetching car types:', error);
                setMsg('Failed to fetch car types. Please try again.');
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
            priceerr: car.price ? validatePrice(car.price) : "Price is required.",
            counterr: car.count ? validateCount(car.count) : "Count is required.",
            hiderr: car.hid ? "" : "Hotel ID is required.",
            cartypeerr: car.cartype ? "" : "Room Type is required."
        };
        Object.keys(errors).forEach(key => {
            dispatch({ type: 'setError', fld: key, val: errors[key] });
        });
        setErrors(errors);
        return Object.values(errors).every(error => error === "");
    };

    const submitHandle = (e) => {
        e.preventDefault();
        console.log("Submitting form with data:", car);

        if (validateForm()) {
            const sendData = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    price: car.price,
                    count: car.count,
                    hid: car.hid,
                    ctype: car.cartype,
                    sid:car.sid
                })
            };
            console.log(sendData);
            fetch("http://localhost:8080/addCar", sendData)
                .then(resp => resp.json())
                .then(obj => {
                    setMsg("Car added successfully.")
                     const fd= new FormData();
                    fd.append("file",file);
                    const reqOptions1={
                        method:"POST",
                        body:fd
                    }
                    console.log(obj);
                    console.log(obj.car_id)
                    fetch("http://localhost:8080/uploadCarImage/"+obj.car_id,reqOptions1)
                    .then(resp=>resp.json())
                    .then(obj=>{
                        if(obj){
                            alert("Request successfull");
                            navigate("/owner_home");
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
            <div className="car-container d-flex justify-content-center align-items-center min-vh-100">
                <div className="bg-light p-4 mt-5 rounded shadow-lg border" style={{ maxWidth: '500px', width: '100%' }}>
                    <h1 className="text-center text-primary mb-3">Add Car</h1>
                    <form onSubmit={submitHandle} className="p-3">
                        <table>
                            <tbody>
                                <tr>
                                    <td colspan='2' style={{ paddingRight: '5px' }}>
                                        <div className="mb-3">
                                            <label htmlFor="price" className="form-label">Price:</label>
                                            <input type="text" className="form-control" id="price" name="price" value={car.price}
                                                onChange={handleChange} />
                                            <div id="priceerr" className="form-text text-danger">{errors.priceerr}</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ paddingLeft: '3px' }}>
                                        <div className="mb-3">
                                            <label htmlFor="count" className="form-label">Count:</label>
                                            <input type="text" className="form-control" id="count" name="count" value={car.count}
                                                onChange={handleChange} />
                                            <div id="counterr" className="form-text text-danger">{errors.counterr}</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ paddingRight: '5px' }}>
                                        <div className="mb-3">
                                            <label htmlFor="hid" className="form-label">Hotel ID:</label>
                                            <input type="text" className="form-control" id="hid" name="hid" value={car.hid}
                                                onChange={handleChange} />
                                            <div id="hiderr" className="form-text text-danger">{errors.hiderr}</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ paddingRight: '5px' }}>
                                        <div className="mb-3">
                                            <label htmlFor="cartype" className="form-label">Car Type:</label>
                                            <select className="form-control" id="cartype" name="cartype" value={car.cartype} onChange={handleChange}>
                                                <option value="" disabled>Select an option</option>
                                                {carOptions.map(option => (
                                                    <option key={option.cid} value={option.cid}>{option.type_name}</option>
                                                ))}
                                            </select>
                                            <div id="cartypeerr" className="form-text text-danger">{errors.cartypeerr}</div>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td style={{ paddingRight: '5px' }}>
                                        <div className="mb-3">
                                            <label htmlFor="sid" className="form-label">Enter pickup</label>
                                            <select className="form-control" id="sid" name="sid" value={car.sid} onChange={handleChange}>
                                                <option value="" disabled>Select an option</option>
                                                {sourceOptions.map(option => (
                                                    <option key={option.sid} value={option.sid}>{option.sourcename}</option>
                                                ))}
                                            </select>
                                            <div id="cartypeerr" className="form-text text-danger">{errors.cartypeerr}</div>
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
