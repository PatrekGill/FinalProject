package com.skilldistillery.monkeywrench.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.monkeywrench.entities.Equipment;

public interface EquipmentRepository extends JpaRepository<Equipment, Integer>{

	List<Equipment> findByAddress_Id(int addrId);
}
