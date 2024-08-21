package com.travelnest.entities;

import jakarta.persistence.Column;
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
@Table(name="cars")
public class Car {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int car_id;
	float price;
	int count;
	@Column(columnDefinition="LONGBLOB")
	byte[] image;
	
	@ManyToOne
	@JoinColumn(name="hid")
	Hotel hid;
	
	@ManyToOne
	@JoinColumn(name="cartype")
	CarType ctype;
	
	@ManyToOne
	@JoinColumn(name="sid")
	SourceDestination sid;

	
	
	public SourceDestination getSid() {
		return sid;
	}

	public void setSid(SourceDestination sid) {
		this.sid = sid;
	}

	public int getCar_id() {
		return car_id;
	}

	public void setCar_id(int car_id) {
		this.car_id = car_id;
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

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

	public Hotel getHid() {
		return hid;
	}

	public void setHid(Hotel hid) {
		this.hid = hid;
	}

	public CarType getCtype() {
		return ctype;
	}

	public void setCtype(CarType ctype) {
		this.ctype = ctype;
	}
	
	
	
}
