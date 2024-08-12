package com.travelnest.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.travelnest.entities.Hotel;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Integer> {

}
