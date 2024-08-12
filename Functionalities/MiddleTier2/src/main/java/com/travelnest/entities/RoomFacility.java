package com.travelnest.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="room_facility")
public class RoomFacility {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int id;
	
	@ManyToOne
	@JoinColumn(name="room_id")
	RoomType room_id;
	
	@ManyToOne
	@JoinColumn(name="facility_id")
	Facilities facility_id;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public RoomType getRoom_id() {
		return room_id;
	}

	public void setRoom_id(RoomType room_id) {
		this.room_id = room_id;
	}

	public Facilities getFacility_id() {
		return facility_id;
	}

	public void setFacility_id(Facilities facility_id) {
		this.facility_id = facility_id;
	}
	
		
}
