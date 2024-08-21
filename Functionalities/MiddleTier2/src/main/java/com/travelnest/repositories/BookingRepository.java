package com.travelnest.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.travelnest.entities.Booking;
import com.travelnest.entities.User;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {
	 @Query("SELECT b FROM Booking b JOIN b.room_id r JOIN r.hid h WHERE h.owner_id = :owner_id")
	    List<Booking> findAllByOwnerId(@Param("owner") User owner_id);
	
	
}
