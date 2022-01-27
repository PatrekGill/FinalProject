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

import com.skilldistillery.monkeywrench.entities.EquipmentType;
import com.skilldistillery.monkeywrench.services.EquipmentTypeService;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost:4300"})
public class EquipmentTypeController {
	
	@Autowired
	EquipmentTypeService typeService;
	
	@GetMapping("type")
	public List<EquipmentType> getAllEquipmentTypes(){
		return typeService.getAllEquipmentType();
	}
	
	@PostMapping("type")
	public EquipmentType createNewEquipmentType(@RequestBody EquipmentType type, HttpServletResponse res, HttpServletRequest req) {
		try {
			type = typeService.createNewEquipmentType(type);
			res.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(type.getId());
		}
		catch(Exception e) {
			e.printStackTrace();
			System.err.println("Invalid equipment type sent");
			res.setStatus(400);
			type = null;
		}
		return type;
	}
	
	@PutMapping("type/{typeId}")
	public EquipmentType updateEquipmentType(@RequestBody EquipmentType type, @PathVariable int typeId, HttpServletResponse res) {
		try {
			type = typeService.updateEquipmentType(type, typeId);
			if(type == null) {
				res.setStatus(404);
			}
		}
		catch(Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			type = null;
		}
		return type;
	}
	
	@DeleteMapping("type/{typeId}")
	public void deleteEquipmentType(@PathVariable int typeId, HttpServletResponse res) {
		try {
			if(typeService.deleteEquipmentType(typeId)) {
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
