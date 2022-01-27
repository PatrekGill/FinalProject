package com.skilldistillery.monkeywrench.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.monkeywrench.entities.EquipmentType;

public interface EquipmentTypeRepository extends JpaRepository<EquipmentType, Integer>{

}
