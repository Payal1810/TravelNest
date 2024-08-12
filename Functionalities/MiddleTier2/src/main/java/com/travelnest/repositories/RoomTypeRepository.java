package com.travelnest.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.travelnest.entities.RoomType;

@Repository
public interface RoomTypeRepository extends JpaRepository<RoomType, Integer>{

}
