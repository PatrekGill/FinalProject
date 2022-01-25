package com.skilldistillery.monkeywrench.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.monkeywrench.services.AuthService;

@RestController
public class AuthController {
	
	@Autowired
	private AuthService authSvc;
}
