package com.skilldistillery.monkeywrench.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.monkeywrench.entities.User;
import com.skilldistillery.monkeywrench.services.UserService;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost:4300"})
public class UserController {

	@Autowired
	private UserService userServ;
	
	@GetMapping("user")
	public List<User> index() {
		return userServ.getAllUsers();
	}
	
	@GetMapping("user/{userId}")
	public User getUserById(@PathVariable int userId,
			HttpServletResponse res) {
		User user = userServ.getUserById(userId);
		if(user == null) {
			res.setStatus(404);
		}
		return user;
	}
	
	@PostMapping("user")
	public User addUser(@RequestBody User user, HttpServletResponse res, HttpServletRequest req) {
		try {
			user = userServ.addUser(user);
			res.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(user.getId());
			res.setHeader("Location", url.toString());
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("Invalid User sent");
			res.setStatus(400);
			user = null;
		}
		return user;
	}
	
	@PutMapping("user/{userId}")
	public User updateUser(@RequestBody User user, @PathVariable int userId, HttpServletResponse res) {
		try {
			user = userServ.updateUser(userId, user);
			if(user == null) {
				res.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			user = null;
		}
		return user;
	}
	
	@DeleteMapping("user/{userId}")
	public void deleteUser(@PathVariable int userId, HttpServletResponse res) {
		try {
			if(userServ.deleteUser(userId)) {
				res.setStatus(204);
			}
			else {
				res.setStatus(404);
			}
		}
		catch(Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
	}
	
	@GetMapping("username/{username}")
	public User getUserByUsername(@PathVariable String username, HttpServletResponse res) {
		User user = userServ.getByUsername(username);
		if(user == null) {
			res.setStatus(404);
		}
		return user;
	}
	
	
}

