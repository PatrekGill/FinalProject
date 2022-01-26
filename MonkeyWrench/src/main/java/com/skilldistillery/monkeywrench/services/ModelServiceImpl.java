package com.skilldistillery.monkeywrench.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.monkeywrench.entities.Model;
import com.skilldistillery.monkeywrench.repositories.ModelRepository;

@Service
public class ModelServiceImpl implements ModelService {
	
	@Autowired
	private ModelRepository modelRepo;

	@Override
	public List<Model> findAllModels() {
		return modelRepo.findAll();
	}

	@Override
	public Model createNewModel() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Model updateModel() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean deleteModel() {
		// TODO Auto-generated method stub
		return false;
	}

	
}
