package com.skilldistillery.monkeywrench.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.monkeywrench.entities.Solution;
import com.skilldistillery.monkeywrench.services.SolutionService;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost:4300"})
public class SolutionController {
	
	@Autowired
	SolutionService solutionService;
	
	@GetMapping("solution")
	public List<Solution> getAllSolutions(){
		return solutionService.getAllSolutions();
	}
	
}
