package com.skilldistillery.monkeywrench.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.monkeywrench.entities.ServiceType;

public interface ServiceTypeRepository extends JpaRepository<ServiceType, Integer> {

}
