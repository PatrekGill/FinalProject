package com.skilldistillery.monkeywrench.controllers;

import java.security.Principal;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.monkeywrench.entities.User;
import com.skilldistillery.monkeywrench.services.AuthService;

@RestController
public class AuthController {
	
	@Autowired
	private AuthService authSvc;
	
	@GetMapping("usertest")
	public User userTest() {
		return authSvc.findUserByName("johndoe");
	}
	
	@RequestMapping(path = "/register", method = RequestMethod.POST)
	public User register(@RequestBody User user, HttpServletResponse res) {

	    if (user == null) {
	        res.setStatus(400);
	    }

	    user = authSvc.register(user);

	    return user;
	}

	@RequestMapping(path = "/authenticate", method = RequestMethod.GET)
	public User authenticate(Principal principal) {
	    return authSvc.findUserByName(principal.getName());
	}
}
