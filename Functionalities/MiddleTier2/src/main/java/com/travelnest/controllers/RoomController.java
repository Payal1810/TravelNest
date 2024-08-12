package com.travelnest.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.travelnest.entities.Hotel;
import com.travelnest.entities.Room;
import com.travelnest.entities.RoomDummy;
import com.travelnest.entities.RoomType;
import com.travelnest.services.HotelService;
import com.travelnest.services.RoomService;
import com.travelnest.services.RoomTypeService;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class RoomController {
	
	@Autowired
	HotelService hs;
	
	@Autowired
	RoomService rs;
	
	@Autowired
	RoomTypeService rts;
	
	@PostMapping("/addRoom")
	public Room addRoom(@RequestBody RoomDummy rd) {
		Hotel h=hs.getById(rd.getHid());
		RoomType rt = rts.getById(rd.getRtype());
		Room r=new Room();
		r.setPrice(rd.getPrice());
		r.setCount(rd.getCount());
		r.setHid(h);
		r.setRtype(rt);
		
		return rs.addRoom(r);
		
	}
}
