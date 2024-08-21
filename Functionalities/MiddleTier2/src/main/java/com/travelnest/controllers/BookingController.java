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

import com.travelnest.entities.Booking;
import com.travelnest.entities.BookingDummy;
import com.travelnest.entities.Car;
import com.travelnest.entities.Room;
import com.travelnest.entities.User;
import com.travelnest.services.BookingService;
import com.travelnest.services.CarService;
import com.travelnest.services.RoomService;
import com.travelnest.services.UserService;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class BookingController {
	@Autowired
	RoomService rs;
	@Autowired
	BookingService bs;
	@Autowired
	CarService cs;
	@Autowired
	UserService us; 
	@PostMapping("/addBooking")
	public Booking addBooking(@RequestBody BookingDummy bd) {
		System.out.println(bd);
		Room r=rs.getById(bd.getRoom_id());
		Car c=cs.getById(bd.getCar_id());
		User u=us.getById(bd.getCust_id());
		Booking b=new Booking();
		b.setRoom_id(r);
		b.setCar_id(c);
		b.setCost(bd.getCost());
		b.setPaid(bd.getPaid());
		b.setCheckin(bd.getCheckin());
		b.setCheckout(bd.getCheckout());
		b.setCust_id(u);
		return bs.addBooking(b);
	}
	
	@GetMapping("/allBookings")
    public List<Booking> getAllHotels() {
        return bs.getAllBookings();
    }
	
	@GetMapping("/owner/{owner_id}")
    public List<Booking> getBookingsByOwnerId(@PathVariable("ownerId") int owner_id) {
        User owner = us.getById(owner_id);
        return bs.getBookingsByOwnerId(owner);
    }
	

}
