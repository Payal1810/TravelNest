package com.travelnest.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.travelnest.entities.User;
import com.travelnest.services.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {
	
	@Autowired
	UserService userv; 
	
	
	  @GetMapping("/getUser") 
	  public User getUser(@RequestParam("loginid")int loginid) {
		return userv.getById(loginid);
	  }
	 
}