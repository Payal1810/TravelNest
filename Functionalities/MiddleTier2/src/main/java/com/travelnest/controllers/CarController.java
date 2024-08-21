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

import com.travelnest.entities.Car;
import com.travelnest.entities.CarDummy;
import com.travelnest.entities.CarType;
import com.travelnest.entities.Hotel;
import com.travelnest.entities.SourceDestination;
import com.travelnest.services.CarService;
import com.travelnest.services.CarTypeService;
import com.travelnest.services.HotelService;
import com.travelnest.services.SourceDestinationService;


@RestController
@CrossOrigin(origins="http://localhost:3000")
public class CarController {

	@Autowired
	HotelService hs;
	
	@Autowired
	CarService cs;
	
	@Autowired
	CarTypeService cts;
	
	@Autowired
	SourceDestinationService sds;
	
	@PostMapping("/addCar")
	public Car addCar(@RequestBody CarDummy cd) {
		Hotel h=hs.getById(cd.getHid());
		CarType ct = cts.getById(cd.getCtype());
		SourceDestination sd=sds.getById(cd.getSid());
		Car c=new Car();
		c.setPrice(cd.getPrice());
		c.setCount(cd.getCount());
		c.setHid(h);
		c.setCtype(ct);
		c.setSid(sd);
		return cs.addCar(c);
		
	}
	
//	@GetMapping("/getUser") 
//	  public Room getRoom(@RequestParam("loginid")int loginid) {
//		return .getById(loginid);
//	  }
	
	@PostMapping(value="/uploadCarImage/{car_id}", consumes="multipart/form-data")
	public boolean uploadImage(@PathVariable("car_id")int car_id,@RequestBody MultipartFile file) {
		boolean flag=true;
		try {
			cs.upload(car_id, file.getBytes());
		}
		catch(Exception e) {
			flag=false;
		}
		return flag;
	}
	
	@GetMapping("/getCarsByhotel")
    public List<Car> getCarsByhotelId(@RequestParam int hotelId) {
        return cs.getAllCarsByHotelId(hotelId);
        
    }
	
	@GetMapping("/getCarsByCarType")
	public List<Car> getCarsByCarType(@RequestParam int cartype){
		return cs.getCarsByCarType(cartype);
	}
	
	@GetMapping("/getCarsByHotelAndCarType")
    public List<Car> getCarsByHotelAndCarType(@RequestParam int hid, @RequestParam int cid) {
        return cs.getCarsByHotelAndCarType(hid, cid);
    }
}
