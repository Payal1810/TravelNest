package com.travelnest.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelnest.entities.Hotel;
import com.travelnest.repositories.HotelRepository;

@Service
public class HotelService {
	
	@Autowired
	HotelRepository hr;
	
	public Hotel addHotel(Hotel h) {
		return hr.save(h);
	}
	
	public Hotel getById(int hotelid) {
		return hr.findById(hotelid).get();
	}

}
