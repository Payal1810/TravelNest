import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom'

export default function OwnerHome() {

    const [owner, setOwner] = useState(null);
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
                setOwner(obj);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
    }, []);





    return (
        <div >
            <nav className="navbar navbar-expand-sm bg-light mb-3">
                <div className="container-fluid">
                    <ul className="navbar-nav">

                        
                        <li className="navbar-item">
                            <Link to="viewhotels" state={{ owner_id: owner?.user_id }} className="nav-link px-3">View Hotels</Link>
                        </li>
                        {/* <li className="navbar-item">
                            <Link to="viewBookings" className="nav-link px-3">View Bookings</Link>
                        </li> */}
                    
                        <li className="navbar-item">
                            <Link to="addHotel" className="nav-link px-3">Add Hotel</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="addCar" className="nav-link px-3">Add Car</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="addRoom" className="nav-link px-3">Add Room</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/logout" className="nav-link px-3">Logout</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <h4>Welcome {owner && owner.fname} {owner && owner.lname}</h4>
            <Outlet />
        </div>
    )
}