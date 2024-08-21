package com.travelnest.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.travelnest.entities.SourceDestination;
import com.travelnest.services.SourceDestinationService;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class SourceDestinationController {
	@Autowired
	SourceDestinationService sdService; 
	
	
	
	 @GetMapping("/getSource")
	    public List<SourceDestination> getSourceTypes() {
	        return sdService.getSourceTypes();
	    }
}
