import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom'


export default function AdminHome() {
    const [admin, setAdmin] = useState(null);

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
                setAdmin(obj);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
    }, []);

    return (
        <div>
        <div className="admin-container justify-content-center align-items-center min-vh-100">
            <nav className="navbar navbar-expand-sm bg-light mb-3">
                <div className="container-fluid">
                    <ul className="navbar-nav">
                        <li className="navbar-item">
                            <Link to="approveOwner" className="nav-link px-3">Approve Owners</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="approveHotels" className="nav-link px-3">Approve Hotels</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="viewOwners" className="nav-link px-3">View Owners</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="viewCustomers" className="nav-link px-3">View Customers</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="viewHotels" className="nav-link px-3">View Hotels</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="viewBookings" className="nav-link px-3">View Bookings</Link>
                        </li>

                        <li className="navbar-item">
                            <Link to="/logout" className="nav-link px-3">Logout</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <h4 class="text-start">Welcome {admin && admin.fname} {admin && admin.lname}</h4>
            <Outlet />
        </div>
        </div>

    )
}