package com.skilldistillery.monkeywrench.entities;

import java.util.List;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Model {
	
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column( name = "model_number")
	private String modelNumber;
	
	private String description;
	
	@Column( name = "fuel_type")
	private String fuelType;
	
	@ManyToOne
	@JoinColumn( name = "equipment_type_id")
	private EquipmentType equipmentType;
	
	@JsonIgnore
	@OneToMany(mappedBy = "model")
	private List<Equipment> equipment;


	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getModelNumber() {
		return modelNumber;
	}

	public void setModelNumber(String modelNumber) {
		this.modelNumber = modelNumber;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getFuelType() {
		return fuelType;
	}

	public void setFuelType(String fuelType) {
		this.fuelType = fuelType;
	}

	public EquipmentType getEquipmentType() {
		return equipmentType;
	}

	public void setEquipmentType(EquipmentType equipmentType) {
		this.equipmentType = equipmentType;
	}

	public List<Equipment> getEquipment() {
		return equipment;
	}

	public void setEquipment(List<Equipment> equipment) {
		this.equipment = equipment;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Model other = (Model) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "Model [id=" + id + ", modelNumber=" + modelNumber + ", description=" + description + ", fuelType="
				+ fuelType + "]";
	}
	
}

