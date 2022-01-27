package com.skilldistillery.monkeywrench.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.monkeywrench.entities.EquipmentType;
import com.skilldistillery.monkeywrench.repositories.EquipmentTypeRepository;

@Service
public class EquipmentTypeServiceImpl implements EquipmentTypeService {
	
	@Autowired
	private EquipmentTypeRepository typeRepo;

	@Override
	public List<EquipmentType> getAllEquipmentType() {
		return typeRepo.findAll();
	}

	@Override
	public EquipmentType createNewEquipmentType(EquipmentType type) {
		return typeRepo.saveAndFlush(type);
	}

	@Override
	public EquipmentType updateEquipmentType(EquipmentType type, int typeId) {
		type.setId(typeId);
		if(typeRepo.existsById(typeId)) {
			return typeRepo.saveAndFlush(type);
		}
		return null;
	}

	@Override
	public boolean deleteEquipmentType(int typeId) {
		boolean deletedType = false;
		Optional<EquipmentType> op = typeRepo.findById(typeId);
		if(op.isPresent()) {
			typeRepo.deleteById(typeId);
			deletedType = true;
		}
		return deletedType;
	}

}
