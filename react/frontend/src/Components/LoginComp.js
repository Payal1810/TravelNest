import { useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./slice";



export default function LoginComp() {
    const init = {
        Email: "",  // Updated field name
        Password: ""  // Updated field name
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'update':
                return { ...state, [action.fld]: action.val };
            case 'reset':
                return init;
            default:
                return state;
        }
    };

    const [info, dispatch] = useReducer(reducer, init);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const reduxAction=useDispatch();

    const sendData = async (e) => {
        e.preventDefault();
        console.log("phase 1");
        const reqOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(info)
        };
       
        try {
            
            const response = await fetch("https://localhost:7090/api/UserManagement/VerifyLogin", reqOptions);
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}, ${errorText}`);
            }
            
            const obj = await response.json();
            console.log(obj);
            
            if (Object.keys(obj).length === 0) {
                
                setMsg("Wrong email ID or password");
            } else {
                
                reduxAction(login())
                localStorage.setItem("loggedUser",JSON.stringify(obj));
               
                if (obj.authorized === 0) {
                    alert("Request has not been approved");
                } else {
                    console.log("phase 7");
                    switch (obj.roleId) {
                        case 1:
                            navigate("/admin_home");
                            break;
                        case 2:
                            navigate("/owner_home");
                            break;
                        case 3:
                            navigate("/customer_home");
                            break;
                    }
                }
            }
        } catch (error) {
            console.error('Fetch error:', error);
            console.log("phase 8");
            setMsg("An error occurred while processing your request.");
        }
    };

    return (
        <div className="login-container  d-flex justify-content-center align-items-center vh-100">
            
            <div className="login-box">
                <h3 className="card-title text-center mb-4">Login</h3>
            <form>
                <div className="mb-3">
                    <label htmlFor="Email" className="form-label">Enter email id:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="Email"  // Updated ID
                        name="Email"  // Updated name
                        value={info.Email}
                        onChange={(e) => dispatch({ type: 'update', fld: 'Email', val: e.target.value })}
                    /><br />
                    <div id="mailerror" className="form-text"></div>
                </div>

                <div className="mb-3">
                    <label htmlFor="Password" className="form-label">Enter Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="Password"  // Updated ID
                        name="Password"  // Updated name
                        value={info.Password}
                        onChange={(e) => dispatch({ type: 'update', fld: 'Password', val: e.target.value })}
                    /><br />
                    <div id="pwderror" className="form-text"></div>
                </div>

                <button type="submit" className="btn btn-primary mb-3" onClick={sendData}>Submit</button>
                <button type="reset" className="btn btn-primary mb-3" onClick={() => dispatch({ type: 'reset' })}>Clear</button>
            </form>
            <p>{msg}</p>
        </div>
        </div>
        
  
        
       
    );
}