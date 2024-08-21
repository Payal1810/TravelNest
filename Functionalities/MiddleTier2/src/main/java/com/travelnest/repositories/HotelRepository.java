package com.travelnest.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.travelnest.entities.Area;
import com.travelnest.entities.Hotel;

import jakarta.transaction.Transactional;

@Transactional
@Repository
public interface HotelRepository extends JpaRepository<Hotel, Integer> {

	
	@Modifying
	@Query("update Hotel set image=:file where hid= :id")
	public int uploadImage(int id,byte[]file);
	  
		List<Hotel> findByStatus(int status);
		
		@Query("SELECT h FROM Hotel h JOIN FETCH h.area WHERE h.status = :status")
		List<Hotel> findByStatusWithArea(@Param("status") int status);
		
		/*
		 * @Query("SELECT h FROM Hotel h WHERE h.cityId = :cityId AND h.areaId = :areaId"
		 * ) List<Hotel> findByCityAndArea(@Param("cityId") int cityId, @Param("areaId")
		 * int areaId);
		 */
		
//		@Query(value = "SELECT h FROM hotel h WHERE h.area = :area")
//	    List<Hotel> findByArea(@Param("area") int area);
		List<Hotel> findByArea(Area area);
		
		@Query("SELECT h FROM Hotel h WHERE h.owner_id.user_id = :ownerId")
		List<Hotel> findHotelsByOwnerId(int ownerId);
		

		
		
		
		List<Hotel> deleteById(int hotelId);
}
