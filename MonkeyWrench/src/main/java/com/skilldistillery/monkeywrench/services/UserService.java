package com.skilldistillery.monkeywrench.services;

import java.util.List;

import com.skilldistillery.monkeywrench.entities.User;

public interface UserService {

	public List <User> getAllUsers();
	public User getUserById(int userId);
	public boolean deleteUser(int userId);
	public User addUser(User user);
	public User updateUser(int userId, User user);
}
