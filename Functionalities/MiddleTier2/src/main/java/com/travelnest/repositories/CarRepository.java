package com.travelnest.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.travelnest.entities.Car;

import jakarta.transaction.Transactional;

@Transactional
@Repository
public interface CarRepository extends JpaRepository<Car,Integer>{

	@Modifying
	@Query("update Car set image=:file where car_id= :id")
	public int uploadPhoto(int id,byte[]file);
	
	List<Car> findByHidHid(int hotelId);
	
	List<Car> findByCtypeCid(int cartype);

    

List<Car> findByHidHidAndCtypeCid(int hid, int cid);
    
    // Or using a custom query
    @Query("SELECT c FROM Car c WHERE c.hid.hid = :hid AND c.ctype.cid = :cid")
    List<Car> findCarsByHotelAndCarType(@Param("hid") int hid, @Param("cid") int cid);
}
