package com.travelnest.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.travelnest.entities.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, Integer>{

}
