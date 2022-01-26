package com.skilldistillery.monkeywrench.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.monkeywrench.entities.Model;

public interface ModelRepository extends JpaRepository<Model, Integer>{

}
