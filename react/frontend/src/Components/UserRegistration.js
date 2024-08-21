import React, { useState, useReducer, useEffect } from 'react';
import { Button } from 'react-bootstrap';

const initialState = {
   
    Fname: '',
    Lname: '',
    Email: '',
    Mobile: '',
    Aadhar: '',
    city: '',
    area: '',
    cityOptions: [],  //to hold the city options
    areaOptions: [], //to hold area option
    address: '',
    roles: [], // to hold role options
    securityQuestions: [], // to hold security question options
    selectedRole: '',
    Squestion: '',
    Answer: '',
    Password: '',
    
    errors: {
        fnameerr: '',
        emailerr: '',
        mobileerr: '',
        aadharerr: '',
        cityerr: '',
        areaerr: '',
        adderr: '',
        roleerr: '',
        squererr: '',
        anserr: '',
        pwderr: ''
    }
};

 // Reducer function to handle form state updates
 function reducer(state, action) {
    switch (action.type) {
        case 'updateCities':
            return { ...state, cityOptions: action.val };
        case 'update':
            return { ...state, [action.fld]: action.val };
        case 'updateAreas':
            return { ...state, areaOptions: action.val };
        case 'updateRoles':
            return { ...state, roles: action.val };
        case 'updateSecurityQuestions':
            return { ...state, securityQuestions: action.val };
        case 'setErrors':
            return { ...state, errors: { ...state.errors, ...action.errors } };
        case 'reset':
            return initialState;
        default:
            return state;
    }
}

  
  // Validation functions
const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) ? "" : "Invalid email format.";
  };
  
  const validateContactNumber = (number) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(number) ? "" : "Contact Number must be 10 digits and contain only numbers.";
  };
  const validateAadharNumber = (number) => {
    const regex = /^[0-9]{12}$/;
    return regex.test(number) ? "" : "Aadhar Number must be 12 digits and contain only numbers.";
  };
  const validateAddress = (add) => {
    const regex = /^[^@]{6,100}$/;
    return regex.test(add) ? "" : "Address Number must be 12 digits and contain only numbers.";
  };
  const validatePassword = (password) => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return regex.test(password) ? "" : "Password must contain at least one digit, one special character, and be at least 8 characters long.";
};

  // Function to handle the dispatching of city options
const dispatchCityOptions = (dispatch, cityOptions) => {
    //console.log("Dispatching updated city options:", cityOptions);
    dispatch({ type: 'updateCities', val: cityOptions });
};

export default function UserRegistration(){

    const [user, dispatch]= useReducer(reducer, initialState);
    const [msg, setmsg] = useState("");
    const [errors, setErrors] = useState(initialState.errors);

    useEffect(() => {
        // Fetch city options when component mounts
        fetch("https://localhost:7090/api/UserManagement/GetCity")
            .then(response => response.json())
            .then(data => {
                // Ensure data is in the format [{ CityId: number, Cname: string }]
               // console.log("Raw data from API:", data);
                const cityOptions = data.map(city => ({
                    id: city.cityId,
                    name: city.cname
                }));
               // console.log("Processed city options:", cityOptions);

                dispatchCityOptions(dispatch, cityOptions);
            })
            .catch(error => console.error('Error fetching cities:', error));

            fetch("https://localhost:7090/api/UserManagement/GetRoles")
            .then(response => response.json())
            .then(data => {
                dispatch({ type: 'updateRoles', val: data });
            })
            .catch(error => console.error('Error fetching roles:', error));

            fetch("https://localhost:7090/api/UserManagement/GetSecurityQuestions")
            .then(response => response.json())
            .then(data => {
                //console.log("Security Questions fetched:", data); 
                dispatch({ type: 'updateSecurityQuestions', val: data });
            })
            .catch(error => console.error('Error fetching security questions:', error));
    }, []);

    useEffect(() => {
        if (user.city) {
            const selectedCity = user.cityOptions.find(city => city.name === user.city);
            if (selectedCity) {
                fetch(`https://localhost:7090/api/UserManagement/GetAreasByCity/${selectedCity.id}`)
                    .then(response => response.json())
                    .then(data => {
                        const areaOptions = data.map(area => ({ id: area.areaId, name: area.aname }));
                        dispatch({ type: 'updateAreas', val: areaOptions });
                    })                   
                    .catch(error => console.error('Error fetching areas:', error));
            }
        }
    }, [user.city, user.cityOptions]);

   

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: 'update', fld: name, val: value });
        validateForm(); // Validate the form on every change
    };
    
    const submitHandle = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const sendData = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    Fname: user.Fname,
                    Lname: user.Lname,
                    Email: user.Email,
                    Mobile: user.Mobile,
                    Aadhar: user.Aadhar,
                    City: user.city,
                    Area: user.area,
                    Address: user.address,
                    RoleId: user.selectedRole,
                    Question: user.Squestion,
                    Answer: user.Answer,
                    Password: user.Password,
                })
            };
            fetch("https://localhost:7090/api/UserManagement/SaveUser", sendData)
                .then(resp => resp.json())
                .then(obj => setmsg("Registration successful!"))
                .catch(error => {
                    console.error('Error:', error);
                    setmsg(error.message);
                });
        }
    };
    

 
  

      const validateForm = () => {
        const errors = {
            fnameerr: user.Fname ? "" : "First Name is required.",
            emailerr: user.Email ? validateEmail(user.Email) : "Email Id is required.",
            mobileerr: user.Mobile ? validateContactNumber(user.Mobile) : "Contact Number is required.",
            aadharerr: user.Aadhar ? validateAadharNumber(user.Aadhar) : "Aadhar Number is required.",
            cityerr: user.city ? "" : "City is required.",
            areaerr: user.area ? "" : "Area is required.",
            adderr: user.address ? validateAddress(user.address) : "Address is required.",
            roleerr: user.selectedRole ? "" : "Role is required.",
            squererr: user.Squestion ? "" : "Security Question is required.",
            anserr: user.Answer ? "" : "Answer is required.",
            pwderr: user.Password ? validatePassword(user.Password) : "Password is required."
        };
    
        dispatch({ type: 'setErrors', errors });
    
        return Object.values(errors).every(error => error === "");
    };
    
    
 
     return(
          <div className="registration-container d-flex justify-content-center align-items-center min-vh-100">
            <div className="bg-light p-4 mt-5 rounded shadow-lg border" style={{maxWidth: '500px', width:'100%'}}>
            <h1 className="text-center text-primary mb-3">Registration Form</h1>
            <form onSubmit={submitHandle} className="p-3">
                  <table>
                    <tr>
                        <td style={{ paddingRight: '5px' }}>
                            <div className="mb-3">
                                <label htmlFor="Fname" className="form-label">First Name:</label>
                                <input type="text" className={'{form-control ${errors.fnameError ? "is-invalid" : ""}}'} id="Fname" name="Fname" value={user.Fname}
                                onChange={handleChange} />
                                {/*{errors.fnameError && <div className="invalid-feedback">{errors.fnameError}</div>}*/}
                                <div id="fnameerr" className="form-text text-danger">{errors.fnameerr}</div>
                            </div>
                        </td>
                        <td style={{ paddingLeft: '3px' }}>
                            <div className="mb-3">
                                <label htmlFor="Lname" className="form-label">Last Name:</label>
                                <input type="text" className="form-control " id="Lname" name="Lname" value={user.Lname}
                                onChange={handleChange} />
                             </div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ paddingRight: '5px' }}>
                            <div className="mb-3">
                                <label htmlFor="Email" className="form-label">Email-Id:</label>
                                <input type="text" className="form-control" id="Email" name="Email" value={user.Email}
                                onChange={handleChange} />
                                <div id="emailerr" className="form-text text-danger">{errors.emailerr}</div>
                            </div>
                        </td>
                        <td style={{ paddingLeft: '3px' }}>
                            <div className="mb-3">
                                <label htmlFor="Mobile" className="form-label">Mobile:</label>
                                <input type="text" className="form-control" id="Mobile" name="Mobile" value={user.Mobile}
                                onChange={handleChange} />
                                <div id="mobileerr" className="form-text text-danger">{errors.mobileerr}</div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                    <td style={{ paddingRight: '5px' }}>
                            <div className="mb-3">
                            <label htmlFor="Aadhar" className="form-label">Aadhar Number:</label>
                            <input type="text" className="form-control" id="Aadhar" name="Aadhar" value={user.Aadhar}
                            onChange={handleChange} />
                            <div id="aadharerr" className="form-text text-danger">{errors.aadharerr}</div>
                        </div>
                    </td>
                    <td style={{ paddingRight: '3px' }}>
                            <div className="mb-3">
                                <label htmlFor="city" className="form-label">City:</label>
                                <select className="form-control" id="city" name="city" value={user.city} onChange={handleChange}>
                                <option value="" disabled>Select an option</option>
                                 {user.cityOptions.map(option => (
                                 <option key={option.id} value={option.name}>{option.name}</option>
                                  ))}
                                 </select>
                                 <div id="cityerr" className="form-text text-danger">{errors.cityerr}</div>
                             </div>
                    </td>
                    </tr>
                    <tr>
                    <td style={{ paddingRight: '5px' }}>
                    <div className="mb-3">
                        <label htmlFor="area" className="form-label">Area:</label>
                        <select className="form-control" id="area" name="area" value={user.area}
                        onChange={handleChange} disabled={!user.city}>
                        <option value="" disabled>Select an option</option>
                        {user.areaOptions.map(area => (
                        <option key={area.id} value={area.id}>{area.name}</option>
                         ))}
                        </select>
                        <div id="areaerr" className="form-text text-danger">{errors.areaerr}</div>
                        </div>
                    </td>
                    <td style={{ paddingRight: '3px' }}>
                        <div className="mb-3">
                             <label htmlFor="address" className="form-label">Address:</label>
                             <input type="text" className="form-control" id="address" name="address" value={user.address}
                             onChange={handleChange} />
                             <div id="adderr" className="form-text text-danger">{errors.adderr}</div>
                        </div>
                    </td> 
                    </tr>
                    <tr>
                    <td style={{ paddingRight: '5px' }}>
                    <div className="mb-3">
                        <label htmlFor="selectedRole" className="form-label">Role:</label>
                        <select className="form-control" id="selectedRole" name="selectedRole" value={user.selectedRole}
                         onChange={handleChange}>
                        <option value="" disabled>Select an option</option>
                        {user.roles.map(role => (
                        <option key={role.roleId} value={role.roleId}>{role.rname}</option>
                        ))}
                        </select>
                        <div id="roleerr" className="form-text text-danger">{errors.roleerr}</div>
                        </div>
                    </td>
                    <td style={{ paddingRight: '3px' }}>
                    <div className="mb-3">
                        <label htmlFor="Squestion" className="form-label">Security Question:</label>

                        <select className="form-control" id="Squestion" name="Squestion"
                        value={user.Squestion}onChange={handleChange} >
                        <option value="" disabled>Select an option</option>
                        {user.securityQuestions.map(question => {
                            
                        return (
                        <option key={question.sid} value={question.sid}>
                        {question.question}
                        </option>
                        );
                        })}
                        </select>
                        <div id="squererr" className="form-text text-danger">{user.errors?.squererr}</div>
                        </div>
                    </td>
                    </tr>
                    <tr>
                    <td style={{ paddingRight: '5px' }}>
                    <div className="mb-3">
                        <label htmlFor="Answer" className="form-label">Answer:</label>
                        <input type="text" className="form-control" id="Answer" name="Answer" value={user.Answer}
                        onChange={handleChange} />
                        <div id="anserr" className="form-text text-danger">{errors.anserr}</div>
                    </div>
                    </td>
                    <td style={{ paddingRight: '3px' }}>
                        <div className="mb-3">
                            <label htmlFor="Password" className="form-label">Password:</label>
                            <input type="password" className="form-control" id="Password" name="Password" value={user.Password}
                            onChange={handleChange} />
                            <div id="pwderr" className="form-text text-danger">{errors.pwderr}</div>
                        </div>
                    </td>
                    </tr>
             </table>
             <Button type="submit" className="btn btn-primary mb-3" >Submit</Button>
             <Button type="button" className="btn btn-secondary mb-3" onClick={() => dispatch({ type: 'reset' })}>Clear</Button>

             </form>
             <span>{msg}</span>
            
            </div>
          </div>    
     );
}
