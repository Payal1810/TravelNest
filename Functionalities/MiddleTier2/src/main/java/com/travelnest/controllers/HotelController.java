package com.travelnest.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.travelnest.entities.Area;
import com.travelnest.entities.HotelDummy;
import com.travelnest.entities.Hotel;
import com.travelnest.entities.User;
import com.travelnest.services.AreaService;
import com.travelnest.services.HotelService;
import com.travelnest.services.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class HotelController {
	
	@Autowired
	AreaService as;
	
	@Autowired
	UserService us;
	
	@Autowired
	HotelService hs;
	
	@PostMapping("/addHotel")
	public Hotel addHotel(@RequestBody HotelDummy hd) {
		Area a = as.getById(hd.getAreaid());
		
		User u = us.getById(hd.getUid());
		
		Hotel h = new Hotel();
		
		h.setHname(hd.getHname());
		
		//h.setStatus(0);
		h.setContact(hd.getContact());
		
		h.setLicenseno(hd.getLicenseno());
		
		h.setAddress(hd.getAddress());
		
		h.setArea(a);
		
		h.setOwner_id(u);
		
		return hs.addHotel(h);		
	}
	
	
	 @GetMapping("/allHotel")
	    public List<Hotel> getAllHotels() {
	        return hs.getAllHotels();
	    }
	 
	 @GetMapping("/hotels")
	    public List<Hotel> getAllUser() {
	        return hs.getHotelsByStatus(0);
	    }
		
		@PutMapping("/updateHotelStatus")
	    public List<Hotel> updatHotelStatus() {
	        return hs.updateStatus(1);
	    }
	 
		@GetMapping("/gethotels")
	    public List<Hotel> getAllHotelsByStatus() {
	        return hs.getHotelsByStatus(1);
	    }
		
		@GetMapping("/getAllHotelsByArea")
		public List<Hotel> getAllHotelsByArea(@RequestParam("area") int area) {
			return hs.getHotelsByArea(area);
			
		}
		
		
		@GetMapping("/getHotelsByOwnerId")
		public List<Hotel> getHotelsByOwnerId(@RequestParam int owner_id) {
			return hs.getHotelsByOwnerId(owner_id);
		}
		
		@PostMapping(value="/uploadHotelImage/{hid}", consumes="multipart/form-data")
		public boolean uploadHotelImage(@PathVariable("hid")int hid,@RequestBody MultipartFile file) {
			boolean flag=true;
			try {
				hs.uploadImage(hid, file.getBytes());
			}
			catch(Exception e) {
				System.out.println(e.getMessage());
				flag=false;
			}
			return flag;
		}
		
		
		
		 @PutMapping("/updateHotelStatus/{hotelId}")
		    public Hotel updateHotelStatus(@PathVariable int hotelId) {
		        System.out.println("Update Hotel Status for ID: " + hotelId);
		        
		        Hotel hotel = hs.getHotelById(hotelId);
		        if (hotel != null) {
		            // Directly update the status to 1
		            hotel.setStatus(1);
		            hs.saveHotel(hotel); // Save the updated hotel
		        }

		        return hotel;
		    }
		@DeleteMapping("/deleteHotel/{hotelId}")
		    public void deleteHotel(@PathVariable int hotelId) {
		        hs.deleteHotelById(hotelId);
		    }
	
}
