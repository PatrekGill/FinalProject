package com.skilldistillery.monkeywrench.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.skilldistillery.monkeywrench.entities.User;
import com.skilldistillery.monkeywrench.repositories.UserRepository;

@Service
public class AuthServiceImpl implements AuthService {
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private PasswordEncoder encoder;
	
	@Override
	public User register(User user) {
		user.setPassword(encoder.encode(user.getPassword()));
		user.setEnabled(true);
		userRepo.saveAndFlush(user);
		
		return user;
	}
	
	@Override
	public User findUserByName(String username) {
		return userRepo.findByUsername(username);
	}
}

