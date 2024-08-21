package com.travelnest.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelnest.entities.Booking;
import com.travelnest.entities.User;
import com.travelnest.repositories.BookingRepository;

@Service
public class BookingService {
	@Autowired 
	BookingRepository brepo;
	
	public Booking addBooking(Booking b) {
		return brepo.save(b);
	}
	
	public List<Booking> getAllBookings() {
        return brepo.findAll();
    }
	
		
	public List<Booking> getBookingsByOwnerId(User owner_id) {
        return brepo.findAllByOwnerId(owner_id);
    }

}
