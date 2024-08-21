package com.travelnest.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.travelnest.entities.CarType;
import com.travelnest.services.CarTypeService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CarTypeController {
	@Autowired
	CarTypeService carTypeService; 
	
	
	
	 @GetMapping("/getCarTypes")
	    public List<CarType> getCarTypes() {
	        return carTypeService.getCarTypes();
	    }
}
