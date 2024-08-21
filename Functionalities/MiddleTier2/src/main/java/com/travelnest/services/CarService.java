package com.travelnest.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelnest.entities.Car;
import com.travelnest.repositories.CarRepository;



@Service
public class CarService {
	@Autowired
	CarRepository carrepo;
	
	public Car addCar(Car r) {
		return carrepo.save(r);
	}
	
	public boolean upload(int id,byte[] photo) {
		if(carrepo.uploadPhoto(id, photo)==1)
			return true;
		else
			return false;
		
	}
	
	public Car getById(int car_id) {
		return carrepo.findById(car_id).get();
	}
	
	public List<Car> getAllCarsByHotelId(int hotelId) {
        return carrepo.findByHidHid(hotelId);
    }
	
	public List<Car> getCarsByCarType(int cartype) {
        return carrepo.findByCtypeCid(cartype);
    }
	
	public List<Car> getCarsByHotelAndCarType(int hid, int cid) {
        return carrepo.findByHidHidAndCtypeCid(hid, cid);
        // Or use the custom query method
        // return carRepository.findCarsByHotelAndCarType(hid, cid);
    }
}
