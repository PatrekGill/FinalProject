package com.skilldistillery.monkeywrench.entities;

import java.util.List;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="service_type")
public class ServiceType {
	
	@JsonIgnore
	@ManyToMany
	@JoinTable(name = "business_service_type",
			   joinColumns = @JoinColumn(name = "contractor_id"),
			   inverseJoinColumns = @JoinColumn(name = "business_type_id"))
	private List<Business> businesses;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String description;
	
	private String name;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public List<Business> getBusinesses() {
		return businesses;
	}

	public void setBusinesses(List<Business> businesses) {
		this.businesses = businesses;
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
		ServiceType other = (ServiceType) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "ServiceType [id=" + id + ", description=" + description + ", name=" + name + "]";
	}
	
}
