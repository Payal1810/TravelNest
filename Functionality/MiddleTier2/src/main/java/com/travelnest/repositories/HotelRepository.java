package com.travelnest.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.travelnest.entities.Hotels;
import com.travelnest.entities.User;

public interface HotelRepository extends JpaRepository<Hotels, Integer> {

	List<Hotels> findByStatus(int status);
	
	@Query("SELECT h FROM Hotels h JOIN FETCH h.area WHERE h.status = :status")
	List<Hotels> findByStatusWithArea(@Param("status") int status);
	
	

}
