package com.skilldistillery.monkeywrench.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.monkeywrench.entities.Solution;
import com.skilldistillery.monkeywrench.repositories.SolutionRepository;

@Service
public class SolutionServiceImpl implements SolutionService {
	
	@Autowired
	private SolutionRepository solutionRepo;

	@Override
	public List<Solution> getAllSolutions() {
		return solutionRepo.findAll();
	}

	@Override
	public Solution createNewSolution(Solution solution) {
		return solutionRepo.saveAndFlush(solution);
	}

	@Override
	public Solution updateSolution(Solution solution, int solutionId) {
		solution.setId(solutionId);
		if(solutionRepo.existsById(solutionId)) {
			return solutionRepo.saveAndFlush(solution);
		}
		return null;
	}

	@Override
	public boolean deleteSolution(int solutionId) {
		boolean deletedSolution = false;
		Optional<Solution> op = solutionRepo.findById(solutionId);
		if(op.isPresent()) {
			solutionRepo.deleteById(solutionId);
			deletedSolution = true;
		}
		return deletedSolution;
	}

}
