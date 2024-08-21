package com.travelnest.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
	
//	@GetMapping("/getUser") 
//	  public Room getRoom(@RequestParam("loginid")int loginid) {
//		return .getById(loginid);
//	  }
	
	@PostMapping(value="/uploadImage/{room_id}", consumes="multipart/form-data")
	public boolean uploadImage(@PathVariable("room_id")int room_id,@RequestBody MultipartFile file) {
		boolean flag=true;
		try {
			rs.upload(room_id, file.getBytes());
		}
		catch(Exception e) {
			flag=false;
		}
		return flag;
	}
	
	@GetMapping("/getRoomsByhotelId")
    public List<Room> getRoomsByHotelId(@RequestParam int hid) {
    return  rs.getRoomsByHotelId(hid);
		
}
	
}
