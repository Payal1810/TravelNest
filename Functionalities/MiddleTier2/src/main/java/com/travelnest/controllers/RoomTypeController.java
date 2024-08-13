package com.travelnest.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.travelnest.entities.Hotel;
import com.travelnest.entities.RoomType;
import com.travelnest.services.RoomTypeService;
import com.travelnest.services.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class RoomTypeController {
	
	@Autowired
	RoomTypeService roomTypeService; 
	
	
	
	 @GetMapping("/getRoomTypes")
	    public List<RoomType> getRoomTypes() {
	        return roomTypeService.getRoomTypes();
	    }
	

}
