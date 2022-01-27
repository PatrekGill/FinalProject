package com.skilldistillery.monkeywrench.services;

import java.util.List;

import com.skilldistillery.monkeywrench.entities.Problem;

public interface ProblemService {
	
	List<Problem> getAllProblems();
	
	Problem createNewProblem(Problem problem);
	
	Problem updateProblem(Problem problem, int problemId);
	
	boolean deleteProblem(int problemId);

}
