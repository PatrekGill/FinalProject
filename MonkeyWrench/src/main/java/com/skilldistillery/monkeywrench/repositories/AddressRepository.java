package com.skilldistillery.monkeywrench.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.monkeywrench.entities.Address;

public interface AddressRepository extends JpaRepository<Address, Integer> {

	List<Address> findByUser_Id (int userId);
	
}

