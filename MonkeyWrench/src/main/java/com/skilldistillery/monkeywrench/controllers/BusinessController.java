package com.skilldistillery.monkeywrench.controllers;

import java.security.Principal;
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

import com.skilldistillery.monkeywrench.entities.Business;
import com.skilldistillery.monkeywrench.services.BusinessService;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost:4200"})
public class BusinessController {
	@Autowired
	private BusinessService businessService;

	/* ----------------------------------------------------------------------------
		GET all Businesses
	---------------------------------------------------------------------------- */
	@GetMapping(path="business")
	public List<Business> getAllBusinesses(
		HttpServletRequest req, 
		HttpServletResponse res
	) {
		return businessService.index("");
	}
	

	/* ----------------------------------------------------------------------------
		GET business by id
	---------------------------------------------------------------------------- */
	@GetMapping("business/{id}")
	public Business getBusinessById(
		@PathVariable int id,
		HttpServletResponse res
	) {
		Business business = null;
		if (businessService.existsById(id)) {
			business = businessService.findById(id);
			
		} else {
			res.setStatus(404);
			
		}

		return business;
	}
	

	/* ----------------------------------------------------------------------------
		POST create business
	---------------------------------------------------------------------------- */
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
	

	/* ----------------------------------------------------------------------------
		PUT update game
	---------------------------------------------------------------------------- */
	@PutMapping("business/{id}")
	public Business updateBusiness(
		@PathVariable int id,
		@RequestBody Business business,
		HttpServletResponse res,
		Principal principal
	) {
		try {
			business = businessService.update(principal.getName(), id, business);
			if (business == null) {
				res.setStatus(404);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("Invalid business sent to update");
			res.setStatus(400);
			business = null;
			
		}
		
		return business;
	}
	
	/* ----------------------------------------------------------------------------
		DELETE game
	---------------------------------------------------------------------------- */
	@DeleteMapping("business/{id}")
	public void deleteBusiness(
		@PathVariable int id,
		HttpServletResponse res,
		Principal principal
	) {
		if (businessService.existsById(id)) {
			if (businessService.deleteById(principal.getName(),id)) {
				res.setStatus(204);
				
			} else {
				res.setStatus(409);
				
			}
			
		} else {
			res.setStatus(404);
			
		}
		
	}
}
