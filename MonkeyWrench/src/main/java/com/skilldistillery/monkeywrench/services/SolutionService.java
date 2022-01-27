package com.skilldistillery.monkeywrench.services;

import java.util.List;

import com.skilldistillery.monkeywrench.entities.Solution;

public interface SolutionService {
	
	List<Solution> getAllSolutions();
	
	Solution createNewSolution(Solution solution);
	
	Solution updateSolution(Solution solution, int solutionId);
	
	boolean deleteSolution(int solutionId);

}
