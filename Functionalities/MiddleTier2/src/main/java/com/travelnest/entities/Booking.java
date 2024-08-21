package com.travelnest.entities;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="bookings")
@Getter
@Setter
public class Booking {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int bid;
	  
	float cost, paid;
	@ManyToOne
	@JoinColumn(name="room_id")
	Room room_id;
	
	@ManyToOne
	@JoinColumn(name="car_id")
	Car car_id;
	int status;
	Date checkin, checkout;
	@ManyToOne
	@JoinColumn(name="cust_id")
	User cust_id;
	
	
}
