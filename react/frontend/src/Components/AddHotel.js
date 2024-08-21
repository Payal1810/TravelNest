import React, { useEffect, useReducer, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const initialState = {
    hname: '',
    contact: '',
    licenseno: '',
    address: '',
    city: '',
    area: '',
    cityOptions: [],
    areaOptions: [],
    uid: '',
    errors: {}
};

function reducer(state, action) {
    switch (action.type) {
        case 'update':
            return {
                ...state,
                [action.fld]: action.val
            };
        case 'updateCities':
            return {
                ...state,
                cityOptions: action.val
            };
        case 'updateAreas':
            return {
                ...state,
                areaOptions: action.val
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

const validateField = (name, value) => {
    let error = "";
    switch (name) {
        case 'contact':
            error = /^[0-9]{10}$/.test(value) ? "" : "Contact Number must be 10 digits and contain only numbers.";
            break;
        case 'licenseno':
            error = /^[0-9]{12}$/.test(value) ? "" : "License Number must be 12 digits and contain only numbers.";
            break;
        case 'address':
            error = value.length >= 6 && value.length <= 100 ? "" : "Address must be between 6 and 100 characters.";
            break;
        case 'hname':
            error = value ? "" : "Hotel Name is required.";
            break;
        case 'city':
            error = value ? "" : "City is required.";
            break;
        case 'area':
            error = value ? "" : "Area is required.";
            break;
        default:
            break;
    }
    return error;
};

export default function AddHotel() {
    const [hotel, dispatch] = useReducer(reducer, initialState);
    const [msg, setMsg] = useState("");
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://localhost:7090/api/UserManagement/GetCity")
            .then(response => response.json())
            .then(data => {
                const cityOptions = data.map(city => ({
                    id: city.cityId,
                    name: city.cname
                }));
                dispatch({ type: 'updateCities', val: cityOptions });
            })
            .catch(error => console.error('Error fetching cities:', error));
    }, []);

    useEffect(() => {
        if (hotel.city) {
            const selectedCity = hotel.cityOptions.find(city => city.name === hotel.city);
            if (selectedCity) {
                fetch(`https://localhost:7090/api/UserManagement/GetAreasByCity/${selectedCity.id}`)
                    .then(response => response.json())
                    .then(data => {
                        const areaOptions = data.map(area => ({
                            id: area.areaId,
                            name: area.aname
                        }));
                        dispatch({ type: 'updateAreas', val: areaOptions });
                    })
                    .catch(error => console.error('Error fetching areas:', error));
            }
        }
    }, [hotel.city, hotel.cityOptions]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: 'update', fld: name, val: value });

        // Validate only the field being updated
        const error = validateField(name, value);
        dispatch({ type: 'setError', fld: name + 'err', val: error });
    };

    const validateForm = () => {
        const fieldsToValidate = ['hname', 'contact', 'licenseno', 'address', 'city', 'area'];
        const errors = {};

        fieldsToValidate.forEach(field => {
            const error = validateField(field, hotel[field]);
            if (error) {
                errors[field + 'err'] = error;
            }
        });

        // Set errors in state
        Object.keys(errors).forEach(key => {
            dispatch({ type: 'setError', fld: key, val: errors[key] });
        });

        return Object.values(errors).every(error => error === "");
    };

    const submitHandle = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const sendData = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    hname: hotel.hname,
                    contact: hotel.contact,
                    licenseno: hotel.licenseno,
                    areaid: hotel.area,
                    address: hotel.address,
                    uid: JSON.parse(localStorage.getItem("loggedUser")).userId
                })
            };

            fetch("http://localhost:8080/addHotel", sendData)
                .then(resp => resp.json())
                .then(obj => {
                    console.log("In obj")
                    setMsg("Waiting for admin's approval");
                    const fd = new FormData();
                    fd.append("file", file);
                    const reqOptions1 = {
                        method: "POST",
                        body: fd
                    };
                    fetch("http://localhost:8080/uploadHotelImage/" + obj.hid, reqOptions1)
                        .then(resp => resp.json())
                        .then(obj => {
                            if (obj) {
                                alert("Request successful");
                                navigate("/owner_home");
                            } else {
                                alert("Request unsuccessful");
                                navigate("/owner_home");
                            }
                        });
                })
                .catch(error => {
                    console.error('Error:', error);
                    setMsg(error.message);
                });
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="bg-light p-4 mt-5 rounded shadow-lg border" style={{ maxWidth: '500px', width: '100%' }}>
                <h1 className="text-center text-primary mb-3">Add Hotel</h1>
                <form onSubmit={submitHandle} className="p-3">
                    <div className="mb-3">
                        <label htmlFor="hname" className="form-label">Hotel Name:</label>
                        <input type="text" className="form-control" id="hname" name="hname" value={hotel.hname}
                            onChange={handleChange} />
                        <div id="hnameerr" className="form-text text-danger">{hotel.errors.hnameerr}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contact" className="form-label">Contact No:</label>
                        <input type="text" className="form-control" id="contact" name="contact" value={hotel.contact}
                            onChange={handleChange} />
                        <div id="contacterr" className="form-text text-danger">{hotel.errors.contacterr}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="licenseno" className="form-label">License Number:</label>
                        <input type="text" className="form-control" id="licenseno" name="licenseno" value={hotel.licenseno}
                            onChange={handleChange} />
                        <div id="licensenoerr" className="form-text text-danger">{hotel.errors.licensenoerr}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="city" className="form-label">City:</label>
                        <select className="form-control" id="city" name="city" value={hotel.city} onChange={handleChange}>
                            <option value="" disabled>Select an option</option>
                            {hotel.cityOptions.map(option => (
                                <option key={option.id} value={option.name}>{option.name}</option>
                            ))}
                        </select>
                        <div id="cityerr" className="form-text text-danger">{hotel.errors.cityerr}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="area" className="form-label">Area:</label>
                        <select className="form-control" id="area" name="area" value={hotel.area}
                            onChange={handleChange} disabled={!hotel.city}>
                            <option value="" disabled>Select an option</option>
                            {hotel.areaOptions.map(area => (
                                <option key={area.id} value={area.id}>{area.name}</option>
                            ))}
                        </select>
                        <div id="areaerr" className="form-text text-danger">{hotel.errors.areaerr}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address:</label>
                        <input type="text" className="form-control" id="address" name="address" value={hotel.address}
                            onChange={handleChange} />
                        <div id="addresserr" className="form-text text-danger">{hotel.errors.addresserr}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="file" className="form-label">Hotel Image:</label>
                        <input type="file" className="form-control" id="file" name="file"
                            onChange={(e) => setFile(e.target.files[0])} />
                    </div>
                    <div className="d-grid gap-2">
                        <Button type="submit" variant="primary">Submit</Button>
                    </div>
                </form>
                <div className="text-success">{msg}</div>
            </div>
        </div>
    );
}
