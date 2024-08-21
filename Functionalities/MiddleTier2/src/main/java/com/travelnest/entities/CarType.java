package com.travelnest.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="car_type")
public class CarType {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int cid;
	String type_name;
	
	
}
