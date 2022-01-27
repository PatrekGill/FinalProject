package com.skilldistillery.monkeywrench.services;

import java.util.List;

import com.skilldistillery.monkeywrench.entities.EquipmentType;

public interface EquipmentTypeService {
	
	List<EquipmentType> getAllEquipmentType();
	
	EquipmentType createNewEquipmentType(EquipmentType type);
	
	EquipmentType updateEquipmentType(EquipmentType type, int typeId);
	
	boolean deleteEquipmentType(int typeId);

}
