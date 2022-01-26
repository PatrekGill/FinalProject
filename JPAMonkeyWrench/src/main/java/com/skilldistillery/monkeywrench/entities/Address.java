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
public class Address {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "street_2")
	private String street2;
	@Column(name = "state_abbv")
	private String stateAbbv;
	
	@Column(name = "zip_code")
	private int zipCode;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	@JsonIgnore
	@OneToMany(mappedBy = "address")
	private List<Service> services;
	
	@JsonIgnore
	@OneToMany(mappedBy = "address")
	private List<Equipment> equipment;
	
	private String city;
	private String street;
	private String notes;

	/* ----------------------------------------------------------------------------
		Constructors
	---------------------------------------------------------------------------- */
	public Address() {}

	
	/* ----------------------------------------------------------------------------
		Get/Set ID
	---------------------------------------------------------------------------- */
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}

	/* ----------------------------------------------------------------------------
		Get/Set Street
	---------------------------------------------------------------------------- */
	public String getStreet() {
		return street;
	}
	public void setStreet(String street) {
		this.street = street;
	}

	/* ----------------------------------------------------------------------------
		Get/Set Services
	---------------------------------------------------------------------------- */

	/* ----------------------------------------------------------------------------
		Get/Set Street2
	---------------------------------------------------------------------------- */
	public String getStreet2() {
		return street2;
	}
	public void setStreet2(String street2) {
		this.street2 = street2;
	}

	/* ----------------------------------------------------------------------------
		Get/Set City
	---------------------------------------------------------------------------- */
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}

	/* ----------------------------------------------------------------------------
		Get/Set StateAbbv
	---------------------------------------------------------------------------- */
	public String getStateAbbv() {
		return stateAbbv;
	}
	public void setStateAbbv(String stateAbbv) {
		this.stateAbbv = stateAbbv;
	}


	/* ----------------------------------------------------------------------------
		Get/Set Zipcode
	---------------------------------------------------------------------------- */
	public int getZipCode() {
		return zipCode;
	}
	public void setZipCode(int zipCode) {
		this.zipCode = zipCode;
	}


	public List<Service> getServices() {
		return services;
	}

	public void setServices(List<Service> services) {
		this.services = services;
	}


	/* ----------------------------------------------------------------------------
		Get/Set User
	---------------------------------------------------------------------------- */
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}

	/* ----------------------------------------------------------------------------
		Get/Set Equipment
	---------------------------------------------------------------------------- */
	public List<Equipment> getEquipment() {
		return equipment;
	}
	public void setEquipment(List<Equipment> equipment) {
		this.equipment = equipment;
	}

	/* ----------------------------------------------------------------------------
		Get/Set Notes
	---------------------------------------------------------------------------- */
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}
	
	

	/* ----------------------------------------------------------------------------
		Misc
	---------------------------------------------------------------------------- */
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
		Address other = (Address) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "Address [id=" + id + ", street=" + street + ", street2=" + street2 + ", city=" + city + ", stateAbbv="
				+ stateAbbv + ", zipCode=" + zipCode + ", notes=" + notes + "]";
	}

}

