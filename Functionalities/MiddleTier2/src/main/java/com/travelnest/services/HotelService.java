package com.travelnest.services;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelnest.entities.Area;
import com.travelnest.entities.Hotel;
import com.travelnest.repositories.AreaRepository;
import com.travelnest.repositories.HotelRepository;

@Service
public class HotelService {
	
	@Autowired
	HotelRepository hr;
	
	@Autowired
	  private AreaRepository areaRepository;

	
	public Hotel addHotel(Hotel h) {
		return hr.save(h);
	}
	public Hotel getById(int hotelid) {
		return hr.findById(hotelid).get();
	}
	
	public List<Hotel> getAllHotels() {
        return hr.findAll();
    }
	
	
	public List<Hotel> deleteHotelById(int hotelId) {
	      return  hr.deleteById(hotelId);
	    }

	public Hotel getHotelById(int hotelId) {
		 return hr.findById(hotelId).orElse(null);
	}
	
	/*
	 * public List<Hotel> getHotelByOwnerId(int owner_id){ return
	 * hr.getHotelByOwnerId(owner_id); }
	 */
	
	public List<Hotel> getHotelsByStatus(int status) {
	    System.out.println(hr.findByStatus(status));
        return hr.findByStatus(status);
 }

	public List<Hotel> updateStatus(int status) {
    System.out.println(hr.findByStatus(status));
    return hr.findByStatus(status);
}
	
	
	public boolean uploadImage(int id,byte[] photo) {
		if(hr.uploadImage(id, photo)==1)
			return true;
		else
			return false;
		
	}
	
	 
	    public List<Hotel> getHotelsByArea(int areaId) {
	        Area area = areaRepository.findById(areaId).orElse(null);
	        if (area == null) {
	            // Handle the case where area is not found
	            return null;
	        }
	        return hr.findByArea(area);
	    }
	    
	    public List<Hotel> getHotesByStatus(int status) {
		    System.out.println(hr.findByStatus(status));
	        return hr.findByStatus(status);
	 }
	    
	    public List<Hotel> getHotelsByOwnerId(int owner_id) {
	        return hr.findHotelsByOwnerId(owner_id);
	    }

	    public Hotel saveHotel(Hotel hotel) {
			 return hr.save(hotel);
			
		}
}
