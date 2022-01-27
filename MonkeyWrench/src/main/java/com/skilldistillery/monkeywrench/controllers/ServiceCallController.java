package com.skilldistillery.monkeywrench.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.monkeywrench.entities.ServiceCall;
import com.skilldistillery.monkeywrench.services.ServiceCallService;

@RestController
@CrossOrigin({"*", "http://localhost:4300"})
public class ServiceCallController {
	
	@Autowired
	private ServiceCallService sCallSvc;
	
	//get mapping (GET)
	@GetMapping("api/serviceCalls/")
	public List<ServiceCall> getAllServiceCalls() {
		return sCallSvc.getAllServiceCall();
	}
	
	//get mapping (GET)
	@GetMapping("api/serviceCalls/{scId}")
	public ServiceCall getServiceCallById( 
			@PathVariable int scId
			) {
		return sCallSvc.getServiceCallById(scId);
	}
	
	
	// request mapping (POST)
	@PostMapping("api/serviceCalls/")
	public ServiceCall createNewServiceCall(
			@RequestBody ServiceCall sc,
			HttpServletResponse res, 
			HttpServletRequest req) {
		try {
			sc = sCallSvc.createNewServiceCall(sc);
			res.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(sc.getId());
			res.setHeader("Location", url.toString());
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("Invalid service call sent");
			res.setStatus(400);
			sc = null;
		}
		return sc;
		
	}
	
	// put mapping (PUT)
	@PutMapping("api/serviceCalls/{scId}")
	public ServiceCall updateServiceCall(
			@PathVariable int scId, 
			@RequestBody ServiceCall servCall,
			HttpServletRequest req, 
			HttpServletResponse res
			) {		
		try {
			System.out.println("===============================");
			servCall = sCallSvc.updateServiceCallById(servCall, scId);
			System.out.println("servCall: " + servCall.getId());
			if(servCall == null) {
				res.setStatus(404);
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
		return servCall;
	}
	
	// delete mapping (DELETE)
	
	

}
