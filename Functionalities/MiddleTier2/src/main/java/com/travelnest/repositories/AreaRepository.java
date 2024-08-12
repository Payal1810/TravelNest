package com.travelnest.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.travelnest.entities.Area;

@Repository
public interface AreaRepository extends JpaRepository<Area, Integer> {

}
