import React, { useEffect, useState } from 'react';

export default function ApproveOwner() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        console.log('useEffect is called');
        fetchUsers();
        document.querySelectorAll('.btn-danger').forEach(button => {
            button.addEventListener('click', (e) => {
                console.log('Button manually clicked');
                e.stopPropagation();
            });
        });
    }, []);

    const fetchUsers = async () => {
        console.log('Fetching users...');
        try {
            const response = await fetch('http://localhost:8080/users'); // Update the URL to match your backend
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

    const handleApprove = async (userId) => {
        try {
            // Send approval request to the backend
            await fetch(`http://localhost:8080/approve/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Re-fetch users to get the updated list
            fetchUsers();
        } catch (error) {
            console.error('Error approving user:', error);
        }
    };

    const handleDeny = async (userId) => {
        console.log('Button clicked for userId:', userId);
        console.log('Deny button clicked for user:', userId); // Log to check if this is called
        try {
            await fetch(`http://localhost:8080/${userId}`, {
                method: 'DELETE',
            });
    
            setUsers(users.filter(user => user.user_id !== userId));
        } catch (error) {
            console.error('Error denying user:', error);
        }
    };

    return (
        <div>
            <h2>Approve Owners</h2>
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
                        <th>Actions</th>
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
                            <td>
                                <button 
                                    className="btn btn-success me-2" 
                                    onClick={() => handleApprove(user.user_id)}
                                    disabled={user.authorized === 1} // Disable if already approved
                                >Approve
                                </button>
                                <button 
                                    className="btn btn-danger" 
                                    onClick={() => handleDeny(user.user_id)}
                                    disabled={user.authorized === 1} // Disable if already denied
                                >
                                 Deny
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
