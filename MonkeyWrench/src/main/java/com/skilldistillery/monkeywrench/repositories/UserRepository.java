package com.skilldistillery.monkeywrench.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.monkeywrench.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	User findById(int userId);
	User findByUsername(String username);
}
