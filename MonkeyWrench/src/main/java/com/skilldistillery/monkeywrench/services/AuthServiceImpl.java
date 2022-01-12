package com.skilldistillery.monkeywrench.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.monkeywrench.entities.User;
import com.skilldistillery.monkeywrench.repositories.UserRepository;

@Service
public class AuthServiceImpl implements AuthService {
	
	@Autowired
	private UserRepository userRepo;
	
	@Override
	public User register(User user) {
		return null;
	}
	
	@Override
	public User findUserByName(String username) {
		return userRepo.findByUsername(username);
	}
}

