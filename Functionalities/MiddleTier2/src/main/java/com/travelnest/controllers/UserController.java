package com.travelnest.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
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
	  
	  @GetMapping("/users")
	    public List<User> getAllUser() {
	        return userv.getUsersByAuthorization(0);
	    }
	  
	  @GetMapping("/customers")
	    public List<User> getAllCustomers() {
	        return userv.getCustomerByRole(3);
	    }
	 
	 @PutMapping("/approve/{id}")
	    public void approveUser(@PathVariable int id) {
		 userv.approveUser(id); // Update the user's authorized status to 1
	    }
	 
	 @DeleteMapping("/{id}")
	    public void deleteUser(@PathVariable int id) {
		 userv.deleteUser(id); // Delete the user from the database
	    }
	 
}