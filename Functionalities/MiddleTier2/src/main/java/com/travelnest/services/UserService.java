/**
 * 
 */
package com.travelnest.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelnest.entities.Login;
import com.travelnest.entities.User;
import com.travelnest.repositories.UserRepository;

@Service
public class UserService {
	@Autowired
	UserRepository urepo;
	
	/*
	 * public User getUser(Login l) { return urepo.getUser(l); }
	 */
	
	
	public User getById(int uid) {
		return urepo.findById(uid).get();
	}
	
}
