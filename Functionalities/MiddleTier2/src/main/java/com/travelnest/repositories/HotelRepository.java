package com.travelnest.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.travelnest.entities.Hotel;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Integer> {

	
	/*
	 * @Query("SELECT h FROM Hotel h WHERE h.owner_id = :owner_id") List<Hotel>
	 * getHotelByOwnerId( int owner_id);
	 */
	  
		List<Hotel> findByStatus(int status);
		
		@Query("SELECT h FROM Hotel h JOIN FETCH h.area WHERE h.status = :status")
		List<Hotel> findByStatusWithArea(@Param("status") int status);
		
		/*
		 * @Query("SELECT h FROM Hotel h WHERE h.cityId = :cityId AND h.areaId = :areaId"
		 * ) List<Hotel> findByCityAndArea(@Param("cityId") int cityId, @Param("areaId")
		 * int areaId);
		 */
	

}
