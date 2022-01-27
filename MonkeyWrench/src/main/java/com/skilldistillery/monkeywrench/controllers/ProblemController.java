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

import com.skilldistillery.monkeywrench.entities.Problem;
import com.skilldistillery.monkeywrench.services.ProblemService;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost:4300"})
public class ProblemController {
	
	@Autowired
	private ProblemService problemService;
	
	@GetMapping("problem")
	public List<Problem> getAllProblems(){
		return problemService.getAllProblems();
	}
	
	@PostMapping("problem")
	public Problem createNewProblem(@RequestBody Problem problem, HttpServletRequest req, HttpServletResponse res) {
		try {
			problem = problemService.createNewProblem(problem);
			res.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(problem.getId());
			res.setHeader("Location", url.toString());
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("Invalid problem sent");
			res.setStatus(400);
			problem = null;
		}
		return problem;
	}
	
	@PutMapping("problem/{problemId}")
	public Problem updateProblem(@RequestBody Problem problem, @PathVariable int problemId, HttpServletResponse res) {
		try {
			problem = problemService.updateProblem(problem, problemId);
			if(problem == null) {
				res.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			problem = null;
		}
		return problem;
	}
	
	@DeleteMapping("problem/{problemId}")
	public void deleteProblem(@PathVariable int problemId, HttpServletResponse res) {
		try {
			if(problemService.deleteProblem(problemId)) {
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
