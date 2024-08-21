import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ViewBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);  
    const navigate = useNavigate();

    const location = useLocation();
    // const { owner_id } = location.state || 0;


    useEffect(() => {
        // console.log('owner_id ',typeof owner_id)
        const fetchBookingss = async () => {
            // if(owner_id===undefined && location.state==null)
            try {
                const response = await fetch('http://localhost:8080/allBookings'); // Adjust the URL as necessary
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                 const data = await response.json();

                if (Array.isArray(data)) {
                    setBookings(Array.isArray(data) ? data : []);
                } 
                else {
                setBookings([]);
                console.error("Unexpected data format:", data);
            }
            } catch (error) {
                console.error("Error fetching bookings:", error);
                setError(error.message);
            }
            
            
        };

        fetchBookingss();
    }, []);




  return (
    <div>
    <h4>View Owners</h4>
    <table className="table">
        <thead>
            <tr>
            <th>Hotel name</th>
                <th>Room Id </th>
                <th>Room type</th>
                <th>cost</th>
                {/* <th>Mobile</th>
                <th>Address</th> */}
            </tr>
        </thead>
        <tbody>
            {bookings.map(user => (
                <tr key={user.bid}>
                    <td>{user.room_id.hid.hname}</td>
                    <td>{user.room_id.room_id}</td>
                    <td>{user.room_id.rtype.type_name}</td>
                    <td>{user.cost}</td>
                    {/* <td>{user.aadhar}</td> */}
                    {/* <td>{user.area && user.area.city ? user.area.city.cname : 'N/A'}</td>
                    <td>{user.area ? user.area.aname : 'N/A'}</td>
                    <td>{user.address}</td> */}
                </tr>
            ))}
        </tbody>
    </table>
</div>
);
};
export default ViewBookings;
