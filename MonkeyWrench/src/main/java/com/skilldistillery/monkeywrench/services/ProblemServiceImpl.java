package com.skilldistillery.monkeywrench.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.monkeywrench.entities.Problem;
import com.skilldistillery.monkeywrench.repositories.ProblemRepository;

@Service
public class ProblemServiceImpl implements ProblemService {

	@Autowired
	ProblemRepository problemRepo;

	@Override
	public List<Problem> getAllProblems() {
		return problemRepo.findAll();
	}

	@Override
	public Problem createNewProblem(Problem problem) {
		return problemRepo.saveAndFlush(problem);
	}

	@Override
	public Problem updateProblem(Problem problem, int problemId) {
		problem.setId(problemId);
		if(problemRepo.existsById(problemId)) {
			return problemRepo.saveAndFlush(problem);
		}
		return null;
	}

	@Override
	public boolean deleteProblem(int problemId) {
		boolean deletedProblem = false;
		Optional<Problem> op = problemRepo.findById(problemId);
		if(op.isPresent()) {
			problemRepo.deleteById(problemId);
			deletedProblem = true;
		}
		return deletedProblem;
	}
	
	
}
