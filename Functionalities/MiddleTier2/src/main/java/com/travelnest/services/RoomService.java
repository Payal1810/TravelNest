package com.travelnest.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelnest.entities.Room;
import com.travelnest.repositories.RoomRepository;

@Service
public class RoomService {
	
	@Autowired
	RoomRepository roomrepo;
	
	public Room addRoom(Room r) {
		return roomrepo.save(r);
	}
	
	public boolean upload(int id,byte[] photo) {
		if(roomrepo.uploadPhoto(id, photo)==1)
			return true;
		else
			return false;
		
	}
	
	public Room getById(int room_id) {
		return roomrepo.findById(room_id).get();
	}
	
	public List<Room> getAllRooms() {
        return roomrepo.findAll();
    }
	
	
	public List<Room> getRoomsByHotelId(int hid) {
        return roomrepo.findByHidHid(hid);
    }
}
