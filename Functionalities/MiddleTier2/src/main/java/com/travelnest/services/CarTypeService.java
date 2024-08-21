package com.travelnest.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelnest.entities.CarType;
import com.travelnest.repositories.CarTypeRepository;


@Service
public class CarTypeService {
	@Autowired
	CarTypeRepository carrepo;
	
	public CarType getById(int typeid) {
		return carrepo.findById(typeid).get();
	}
	
	public List<CarType> getCarTypes() {
        return carrepo.findAll();
	}
}
