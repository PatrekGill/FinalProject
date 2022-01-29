package com.skilldistillery.monkeywrench.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.monkeywrench.entities.User;
import com.skilldistillery.monkeywrench.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepo;

	@Override
	public List<User> getAllUsers() {
		return userRepo.findAll();
	}

	@Override
	public User getUserById(int userId) {
		return userRepo.findById(userId);
	}

	@Override
	public boolean deleteUser(int userId) {
		userRepo.deleteById(userId);
		return true;
	}

	@Override
	public User addUser(User user) {
		return userRepo.saveAndFlush(user);
	}

	@Override
	public User updateUser(int userId, User user) {
		user.setId(userId);
		if(userRepo.existsById(userId)) {
			
			return userRepo.saveAndFlush(user);
		}
		return null;
	}

	@Override
	public User getByUsername(String username) {
		User user = userRepo.findByUsername(username);
		return user;
	}

	
}
