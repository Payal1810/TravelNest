import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ViewHotel = () => {
    const [hotels, setHotels] = useState([]);
    const [error, setError] = useState(null);  
    const navigate = useNavigate();

    const location = useLocation();
    const { owner_id } = location.state || 0;


    useEffect(() => {
        console.log('owner_id ',typeof owner_id)
        const fetchHotels = async () => {
            console.log("phase 1")
            if(owner_id===undefined && location.state==null)
            try {
                const response = await fetch('http://localhost:8080/gethotels'); // Adjust the URL as necessary
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                 const data = await response.json();
                console.log(data); // Check the data in the console
                if (Array.isArray(data)) {
                    setHotels(Array.isArray(data) ? data : []);
                } 
                else {
                setHotels([]);
                console.error("Unexpected data format:", data);
            }
            } catch (error) {
                console.error("Error fetching hotels:", error);
                setError(error.message);
            }
            
            else{
                try {
                    const response = await fetch(`http://localhost:8080/getHotelsByOwnerId?owner_id=${owner_id}`); // Adjust the URL as necessary
                 
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                     const data = await response.json();
                   
                    if (Array.isArray(data)) {
                        setHotels(Array.isArray(data) ? data : []);
                    } 
                    else {
                    setHotels([]);
                    console.error("Unexpected data format:", data);
                }
                } catch (error) {
                    console.error("Error fetching hotels:", error);
                    setError(error.message);
                }


            }
        };

        fetchHotels();
    }, []);

    const handleBookRoomClick = () => {
        navigate('/bookroom');
    };

    if (error) {
        return <div>Error: {error}</div>;  // Display error if fetching fails
    }

    const convertToBase64 = (byteArray) => {
        const binaryString = byteArray.reduce((data, byte) => data + String.fromCharCode(byte), '');
        return `data:image/jpeg;base64,${btoa(binaryString)}`;
    };

  return (
    <div className="container">
        <div className="row">
            {hotels.length > 0 ? (
                hotels.map(hotel => (
                    <div key={hotel.hid} className="col-md-4 mb-4">
                        <div className="card border-dark">
                            <img 
                                src={`data:image/jpeg;base64,${hotel.image}`} 
                                alt={hotel.hname} 
                                className="card-img-top" 
                                style={{ height: '200px', objectFit: 'cover' }} 
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title">{hotel.hname}</h5>
                                <button 
                                    onClick={() => handleBookRoomClick(hotel.hid)} 
                                    className="btn btn-primary"
                                >
                                    Book Room
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No hotels available</p>
            )}
        </div>
    </div>
);
};
export default ViewHotel;
