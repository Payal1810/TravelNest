package com.travelnest.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="rooms")
public class Room {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int room_id;
	float price;
	int count, status;
	byte[] image;

	@ManyToOne
	@JoinColumn(name="hid")
	Hotels hid;
	
	@ManyToOne
	@JoinColumn(name="rtype")
	RoomFacility rtype;

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}
	
	public int getRoom_id() {
		return room_id;
	}

	public void setRoom_id(int room_id) {
		this.room_id = room_id;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public Hotels getHid() {
		return hid;
	}

	public void setHid(Hotels hid) {
		this.hid = hid;
	}

	public RoomFacility getRtype() {
		return rtype;
	}

	public void setRtype(RoomFacility rtype) {
		this.rtype = rtype;
	}

}
