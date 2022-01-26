package com.skilldistillery.monkeywrench.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.monkeywrench.entities.ServiceCall;
import com.skilldistillery.monkeywrench.services.ServiceCallService;

@RestController
@CrossOrigin({"*", "http://localhost:4300"})
public class ServiceCallController {
	
	@Autowired
	private ServiceCallService serviceCallSvc;
	
	//get mapping (GET)
	@GetMapping("api/serviceCalls/")
	public List<ServiceCall> getAllServiceCalls() {
		return serviceCallSvc.getAllServiceCall();
	}
	
	
	// request mapping (POST)
	
	
	// put mapping (PUT)
	
	
	// delete mapping (DELETE)
	
	

}
