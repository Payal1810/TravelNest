package com.travelnest.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.travelnest.entities.SourceDestination;

public interface SourceDestinationRepository extends JpaRepository<SourceDestination,Integer> {

}
