package com.travelnest.entities;

import jakarta.persistence.Column;
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
	int count;
	
	@Column(columnDefinition="LONGBLOB")
	byte[] image;

	@ManyToOne
	@JoinColumn(name="hid")
	Hotel hid;
	
	@ManyToOne
	@JoinColumn(name="rtype")
	RoomType rtype;

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

	public Hotel getHid() {
		return hid;
	}

	public void setHid(Hotel hid) {
		this.hid = hid;
	}

	public RoomType getRtype() {
		return rtype;
	}

	public void setRtype(RoomType rtype) {
		this.rtype = rtype;
	}

}
