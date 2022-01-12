package com.skilldistillery.monkeywrench.services;

import com.skilldistillery.monkeywrench.entities.User;

public interface AuthService {

	User register(User user);
	User findUserByName(String username);
}
