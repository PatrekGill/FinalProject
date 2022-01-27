package com.skilldistillery.monkeywrench.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.monkeywrench.entities.Address;

public interface AddressRepository extends JpaRepository<Address, Integer> {
	
}

