package com.skilldistillery.monkeywrench.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	@PostMapping("model")
	public Model createNewModel(@RequestBody Model model, HttpServletResponse res, HttpServletRequest req) {
		try {
			model = modelService.createNewModel(model);
			res.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(model.getId());
			res.setHeader("Location", url.toString());
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("Invalid Model sent");
			res.setStatus(400);
			model = null;
		}
		return model;
	}
	
	@PutMapping("model/{modelId}")
	public Model updateModel(@RequestBody Model model, @PathVariable int modelId, HttpServletResponse res) {
		try {
			model = modelService.updateModel(model, modelId);
			if(model == null) {
				res.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			model = null;
		}
		return model;
	}
	
	@DeleteMapping("model/{modelId}")
	public void deleteModel(@PathVariable int modelId, HttpServletResponse res) {
		try {
			if(modelService.deleteModel(modelId)) {
				res.setStatus(204);
			}
			else {
				res.setStatus(404);
			}
		}
		catch(Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
	}

}
