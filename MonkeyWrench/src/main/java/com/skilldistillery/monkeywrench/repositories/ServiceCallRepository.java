package com.skilldistillery.monkeywrench.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.monkeywrench.entities.ServiceCall;

public interface ServiceCallRepository extends JpaRepository<ServiceCall, Integer> {

	List<ServiceCall> findByUserId(int userId);
	
}
