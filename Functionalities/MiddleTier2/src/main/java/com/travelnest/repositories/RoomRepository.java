package com.travelnest.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.travelnest.entities.Room;

import jakarta.transaction.Transactional;

@Transactional
@Repository
public interface RoomRepository extends JpaRepository<Room, Integer>{
	
	@Modifying
	@Query("update Room set image=:file where room_id= :id")
	public int uploadPhoto(int id,byte[]file);
	
	List<Room> findByHidHid(int hid);
}
