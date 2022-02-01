package com.skilldistillery.monkeywrench.entities;

import java.util.List;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Solution {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String description;
	
	@JsonIgnore
	@OneToMany(mappedBy = "solution")
	private List<ServiceCall> serviceCalls;
	
/* ----------------------------------------------------------------------------
	Constructors
---------------------------------------------------------------------------- */
	public Solution() {
		super();
	}
	
/* ----------------------------------------------------------------------------
	Getters/Setters
---------------------------------------------------------------------------- */
	
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

	public List<ServiceCall> getServiceCalls() {
		return serviceCalls;
	}

	public void setServiceCalls(List<ServiceCall> serviceCalls) {
		this.serviceCalls = serviceCalls;
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
		Solution other = (Solution) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "Solution [id=" + id + ", description=" + description + "]";
	}
	
}

