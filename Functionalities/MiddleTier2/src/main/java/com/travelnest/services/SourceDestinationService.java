package com.travelnest.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelnest.entities.SourceDestination;
import com.travelnest.repositories.SourceDestinationRepository;


@Service
public class SourceDestinationService {
	@Autowired
	SourceDestinationRepository sdrepo;
	
	public SourceDestination getById(int sid) {
		return sdrepo.findById(sid).get();
	}
	
	public List<SourceDestination> getSourceTypes() {
        return sdrepo.findAll();
	}
}
