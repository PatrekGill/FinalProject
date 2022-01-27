package com.skilldistillery.monkeywrench.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.monkeywrench.entities.ServiceCall;

public interface ServiceCallRepository extends JpaRepository<ServiceCall, Integer> {

	
}
