package com.skilldistillery.monkeywrench.services;

import java.util.List;
import java.util.Optional;

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
	public Model createNewModel(Model model) {
		return modelRepo.saveAndFlush(model);
	}

	@Override
	public Model updateModel(Model model, int modelId) {
		model.setId(modelId);
		if(modelRepo.existsById(modelId)) {
			return modelRepo.saveAndFlush(model);
		}
		return null;
	}

	@Override
	public boolean deleteModel(int modelId) {
		boolean deletedModel = false;
		Optional<Model> op = modelRepo.findById(modelId);
		if(op.isPresent()) {
			modelRepo.deleteById(modelId);
			deletedModel = true;
		}
		return deletedModel;
	}

	
}
