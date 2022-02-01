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

import com.skilldistillery.monkeywrench.entities.ServiceCall;
import com.skilldistillery.monkeywrench.services.ServiceCallService;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost:4300"})
public class ServiceCallController {
	
	@Autowired
	private ServiceCallService sCallSvc;
	
	//get mapping (GET)
	@GetMapping("serviceCalls")
	public List<ServiceCall> getAllServiceCalls() {
		return sCallSvc.getAllServiceCall();
	}
	
	//get mapping (GET)
	@GetMapping("serviceCalls/{scId}")
	public ServiceCall getServiceCallById( 
			@PathVariable int scId
			) {
		return sCallSvc.getServiceCallById(scId);
	}
	
	@PostMapping("serviceCalls")
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
	
	@PutMapping("serviceCalls/{scId}")
	public ServiceCall updateServiceCall(
			@PathVariable int scId, 
			@RequestBody ServiceCall servCall,
			HttpServletRequest req, 
			HttpServletResponse res
			) {		
		try {
			servCall = sCallSvc.updateServiceCallById(servCall, scId);
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
	
	@DeleteMapping("serviceCalls/{scId}")
	public void deleteServiceCall(
		@PathVariable Integer scId,
		HttpServletResponse res
		) {
		if(sCallSvc.deleteServiceCall(scId)) {
			res.setStatus(204);
		}
		else {
			res.setStatus(404);
		}
	}
	
		//get service calls by user
		@GetMapping("serviceCalls/user/{userId}")
		public List<ServiceCall> getServiceCallByUserId(@PathVariable int userId) {
			return sCallSvc.findCallsByUserId(userId);
		}
		
		//get service calls by business
		@GetMapping("serviceCalls/business/{businessId}")
		public List<ServiceCall> getServiceCallByBusinessId(@PathVariable int businessId) {
			return sCallSvc.findCallsByBusinessId(businessId);
		}
		
		//get service calls by address
		@GetMapping("serviceCalls/address/{addressId}")
		public List<ServiceCall> getServiceCallByAddressId(@PathVariable int addressId) {
			return sCallSvc.findCallsByAddressId(addressId);
		}

}
