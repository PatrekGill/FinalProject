package com.skilldistillery.monkeywrench.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.monkeywrench.entities.Problem;

public interface ProblemRepository extends JpaRepository<Problem, Integer>{

}
