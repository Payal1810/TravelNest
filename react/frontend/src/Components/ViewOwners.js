import React, { useEffect, useState } from 'react';

export default function ApproveOwner() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        console.log('useEffect is called');
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        console.log('Fetching users...');
        try {
            const response = await fetch('http://localhost:8080/owners'); // Update the URL to match your backend
            console.log(response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    return (
        <div>
            <h4>View Owners</h4>
            <table className="table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Aadhar</th>
                        <th>City</th>
                        <th>Area</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.user_id}>
                            <td>{user.fname}</td>
                            <td>{user.lname}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                            <td>{user.aadhar}</td>
                            <td>{user.area && user.area.city ? user.area.city.cname : 'N/A'}</td>
                            <td>{user.area ? user.area.aname : 'N/A'}</td>
                            <td>{user.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
