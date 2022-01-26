package com.skilldistillery.monkeywrench.services;

import java.util.List;

import com.skilldistillery.monkeywrench.entities.Equipment;

public interface EquipmentService {
	
	List<Equipment> getEquipmentByAddress(int addrId);
	
	Equipment createNewEquipment(Equipment equip);
	
	boolean deleteEquipment(int equipId);
	
	Equipment updateEquipment(Equipment equip, int equipId);

}
