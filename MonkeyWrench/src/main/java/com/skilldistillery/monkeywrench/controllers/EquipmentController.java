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

import com.skilldistillery.monkeywrench.entities.Equipment;
import com.skilldistillery.monkeywrench.services.EquipmentService;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost:4300"})
public class EquipmentController {

	@Autowired
	private EquipmentService equipServ;
	
	@GetMapping("equipment/{addrId}")
	public List<Equipment> getEquipmentByAddress(@PathVariable int addrId, HttpServletResponse res){
		List<Equipment> equip = equipServ.getEquipmentByAddress(addrId);
		if(equip.size() == 0) {
			res.setStatus(404);
		}
		System.out.println(equip);
		return equip;
	}
	
	@PostMapping("equipment")
	public Equipment createNewEquipment(@RequestBody Equipment equip, HttpServletResponse res, HttpServletRequest req) {
		try {
			equip = equipServ.createNewEquipment(equip);
			res.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(equip.getSerialNumber());
			res.setHeader("Location", url.toString());
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("Invalid Equipment sent");
			res.setStatus(400);
			equip = null;
		}
		return equip;
	}
	
	@PutMapping("equipment/{equipId}")
	public Equipment updateEquipment(@RequestBody Equipment equip, @PathVariable int equipId, HttpServletResponse res) {
		try {
			equip = equipServ.updateEquipment(equip, equipId);
			if(equip == null) {
				res.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			equip = null;
		}
		return equip;
	}
	
	@DeleteMapping("equipment/{equipId}")
	public void deleteEquipment(@PathVariable int equipId, HttpServletResponse res) {
		try {
			if(equipServ.deleteEquipment(equipId)) {
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

