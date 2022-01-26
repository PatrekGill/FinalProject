package com.skilldistillery.monkeywrench.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.monkeywrench.entities.Model;
import com.skilldistillery.monkeywrench.services.ModelService;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost:4202"})
public class ModelController {
	
	@Autowired
	private ModelService modelService;
	
	@GetMapping("model")
	public List<Model> getAllModels(){
		return modelService.findAllModels();
	}
	
	

}
