import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function CustomerHome(){

    const [customer, setCustomer] = useState(null);
    useEffect(() => {
        const loginid = JSON.parse(localStorage.getItem("loggedUser")).userId;
        console.log(loginid)
        fetch(`http://localhost:8080/getUser?loginid=${loginid}`)
            .then(resp => {
                if (!resp.ok) {
                    throw new Error('Network response was not ok');
                }
                return resp.json();
            })
            .then(obj => {
                localStorage.setItem("loggedOwner", JSON.stringify(obj));   
                setCustomer(obj);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
    }, []);

    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-light mb-3">
                <div className="container-fluid">
                    <ul className="navbar-nav">
                        <li className="navbar-item">
                            <Link to="searchHotels" className="nav-link px-3">Search Hotels</Link>
                        </li>
                        {/* <li className="navbar-item">
                            <Link to="/viewbooking" className="nav-link px-3">View Bookings</Link>
                        </li> */}
                        
                        <li className="navbar-item">
                            <Link to="/logout" className="nav-link px-3">Logout</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <h4>Welcome {customer && customer.fname} {customer && customer.lname}</h4>
            <Outlet />
        </div>
    )
}