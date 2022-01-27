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
	
	@PostMapping("solution")
	public Solution createNewSolution(@RequestBody Solution solution, HttpServletResponse res, HttpServletRequest req) {
		try {
			solution = solutionService.createNewSolution(solution);
			res.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(solution.getId());
			res.setHeader("Location", url.toString());
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("Invalid Solution sent");
			res.setStatus(400);
			solution = null;
		}
		return solution;
	}
	
	@PutMapping("solution/{solutionId}")
	public Solution updateSolution(@RequestBody Solution solution, @PathVariable int solutionId, HttpServletResponse res) {
		try {
			solution = solutionService.updateSolution(solution, solutionId);
			if(solution == null) {
				res.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			solution = null;
		}
		return solution;
	}
	
	@DeleteMapping("solution/{solutionId}")
	public void deleteSolution(@PathVariable int solutionId, HttpServletResponse res) {
		try {
			if(solutionService.deleteSolution(solutionId)) {
				res.setStatus(204);
			}
			else {
				res.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
	}
	
}
