package com.skilldistillery.monkeywrench.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.monkeywrench.entities.Business;

public interface BusinessRepository extends JpaRepository<Business, Integer> {
	
	List<Business> findByUserId(int userId);
}
