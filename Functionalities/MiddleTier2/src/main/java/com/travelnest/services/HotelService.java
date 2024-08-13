package com.travelnest.services;

import java.util.List;

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
	
	public List<Hotel> getAllHotels() {
        return hr.findAll();
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
	
/*
 * public List<Hotel> searchHotels(int cityId, int areaId) { return
 * hr.findByCityAndArea(cityId, areaId); }
 */

}
