package com.skilldistillery.monkeywrench.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.monkeywrench.entities.Equipment;
import com.skilldistillery.monkeywrench.repositories.EquipmentRepository;

@Service
public class EquipmentServiceImpl implements EquipmentService{

	@Autowired
	private EquipmentRepository equipRepo;
			
	@Override
	public List<Equipment> getEquipmentByAddress(int addrId) {
		return equipRepo.findByAddress_Id(addrId);
	}

	@Override
	public Equipment createNewEquipment(Equipment equip) {
		return equipRepo.saveAndFlush(equip);
	}

	@Override
	public boolean deleteEquipment(int equipId) {
		boolean deletedEquipment = false;
		Optional<Equipment> op = equipRepo.findById(equipId);
		if(op.isPresent()) {
			equipRepo.deleteById(equipId);
			deletedEquipment = true;
		}
		return deletedEquipment;
	}
	
	@Override
	public Equipment updateEquipment(Equipment equip, int equipId) {
		equip.setId(equipId);
		if(equipRepo.existsById(equipId)) {
			return equipRepo.save(equip);
		}
		return null;
	}

}
