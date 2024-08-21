package com.travelnest.entities;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BookingDummy {
	int room_id, car_id,cust_id;
	float cost, paid;
	Date checkin, checkout; 
}
