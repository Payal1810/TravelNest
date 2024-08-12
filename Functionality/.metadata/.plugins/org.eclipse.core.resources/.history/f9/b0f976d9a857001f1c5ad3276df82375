package com.travelnest.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelnest.entities.Area;
import com.travelnest.repositories.AreaRepository;

@Service
public class AreaService {
	
	@Autowired
	AreaRepository ar;
	
	public Area getById(int areaid) {
		return ar.findById(areaid).get();
	}

}
