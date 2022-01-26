package com.skilldistillery.monkeywrench.services;

import java.util.List;

import com.skilldistillery.monkeywrench.entities.Model;

public interface ModelService {
	
	List<Model> findAllModels();
	
	Model createNewModel();
	
	Model updateModel();
	
	boolean deleteModel();
	
	

}
