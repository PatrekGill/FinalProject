package com.skilldistillery.monkeywrench.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.monkeywrench.entities.Business;
import com.skilldistillery.monkeywrench.services.BusinessService;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost:4200"})
public class BusinessController {
	@Autowired
	private BusinessService businessService;
	
	@GetMapping(path="business")
	public List<Business> getAllBusinesses(
		HttpServletRequest req, 
		HttpServletResponse res
	) {
		return businessService.index("");
	}
	
	@PostMapping(path="business")
	public Business createBusiness(
		HttpServletRequest req, 
		HttpServletResponse res,
		Principal principal,
		@RequestBody Business business
	) {
		try {
			business = businessService.create(principal.getName(),business);
			res.setStatus(201);
			
			StringBuffer url = req.getRequestURL();
			url.append("/").append(business.getId());
			res.setHeader("Location",url.toString());
			
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("Invalid business sent to create");
			res.setStatus(400);
			business = null;
			
		}
		
		return business;
	}
}
