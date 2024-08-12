package com.travelnest.services;

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
}
