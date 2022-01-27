package com.skilldistillery.monkeywrench.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.monkeywrench.entities.Business;

public interface BusinessRepository extends JpaRepository<Business, Integer> {
	
}
