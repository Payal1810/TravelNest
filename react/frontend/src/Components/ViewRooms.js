import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ViewRooms() {
  const navigate = useNavigate();
  const { hid } = useParams();
  const [rooms, setRooms] = useState([]);
  const [flipped, setFlipped] = useState({});

  useEffect(() => {
    if (hid) {
      fetch(`http://localhost:8080/getRoomsByhotelId?hid=${hid}`)
        .then((resp) => {
          if (!resp.ok) {
            throw new Error("Network response was not ok");
          }
          return resp.json();
        })
        .then((data) => {
          setRooms(data);
        })
        .catch((error) => {
          console.error("Error fetching rooms data:", error);
        });
    }
  }, [hid]);

  const toggleFlip = (roomId) => {
    setFlipped((prev) => ({ ...prev, [roomId]: !prev[roomId] }));
  };

  return (
    <div className="rooms-grid">
      {rooms.map((room, index) => (
        <div
          key={index}
          className={`room-card ${flipped[room.room_id] ? "flipped" : ""}`}
          onClick={() => toggleFlip(room.room_id)}
        >
          <div className="room-card-inner">
            <div className="room-card-front">
              <img src={`data:image/jpeg;base64,${room.image}`} alt={`Room ${room.room_id}`} />

            </div>
            <div className="room-card-back">
              <h3>{room.hid.hname}</h3>
              <p><strong>Price:</strong> ${room.price}</p>
              <p><strong>Contact:</strong> {room.hid.contact}</p>
              <p><strong>City:</strong> {room.hid.area.city.cname}</p>
              <p><strong>Address:</strong> {room.hid.address}</p>
              <Button
                variant="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/customer_home/addBookings/${room.room_id}`, {
                    state: { hotelId: hid, hotelPrice: room.price },
                  });
                }}
              >
                Book
              </Button>
            </div>
          </div>
        </div>
      ))}
      <style jsx>{`
        .rooms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
          padding: 20px;
        }

        .room-card {
          perspective: 1000px;
          cursor: pointer;
        }

        .room-card-inner {
          position: relative;
          width: 100%;
          height: 350px;
          transform-style: preserve-3d;
          transition: transform 0.6s;
        }

        .room-card.flipped .room-card-inner {
          transform: rotateY(180deg);
        }

        .room-card-front,
        .room-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border: 1px solid #ccc;
          border-radius: 10px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .room-card-front img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 10px;
        }

        .room-card-back {
          background-color: #f8f9fa;
          color: #333;
          transform: rotateY(180deg);
          padding: 20px;
          text-align: left;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-radius: 10px;
        }

        .room-card-back h3 {
          margin-bottom: 15px;
          color: #007bff;
        }

        .room-card-back p {
          margin: 5px 0;
          color: #555;
        }

        .room-card-back button {
          margin-top: 15px;
          background-color: #007bff;
          border: none;
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
        }

        .room-card-back button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
}
