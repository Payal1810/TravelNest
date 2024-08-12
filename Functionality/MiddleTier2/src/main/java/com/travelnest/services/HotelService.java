package com.travelnest.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelnest.entities.Hotels;
import com.travelnest.entities.User;
import com.travelnest.repositories.HotelRepository;

@Service
public class HotelService {
	
	@Autowired
	HotelRepository hr;
	
	public Hotels addHotel(Hotels h) {
		return hr.save(h);
	}
	
	public List<Hotels> getHotesByStatus(int status) {
		    System.out.println(hr.findByStatus(status));
	        return hr.findByStatus(status);
	 }
	
	public List<Hotels> updateStatus(int status) {
	    System.out.println(hr.findByStatus(status));
        return hr.findByStatus(status);
 }

}
