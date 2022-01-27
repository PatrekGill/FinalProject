package com.skilldistillery.monkeywrench.services;

import java.util.List;

import com.skilldistillery.monkeywrench.entities.Model;

public interface ModelService {
	
	List<Model> findAllModels();
	
	Model createNewModel(Model model);
	
	Model updateModel(Model model, int modelId);
	
	boolean deleteModel(int modelId);
	
	

}
