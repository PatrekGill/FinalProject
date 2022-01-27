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

import com.skilldistillery.monkeywrench.entities.ServiceType;
import com.skilldistillery.monkeywrench.services.ServiceTypeService;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost:4200"})
public class ServiceTypeController {
	@Autowired
	private ServiceTypeService serviceTypeService;

	/* ----------------------------------------------------------------------------
		GET all serviceTypes
	---------------------------------------------------------------------------- */
	@GetMapping(path="servicetype")
	public List<ServiceType> getAll(
		HttpServletRequest req, 
		HttpServletResponse res
	) {
		return serviceTypeService.index();
	}
	

	/* ----------------------------------------------------------------------------
		GET serviceType by Id
	---------------------------------------------------------------------------- */
	@GetMapping("servicetype/{id}")
	public ServiceType getById(
		@PathVariable int id,
		HttpServletResponse res
	) {
		ServiceType serviceType = null;
		if (serviceTypeService.existsById(id)) {
			serviceType = serviceTypeService.findById(id);
			
		} else {
			res.setStatus(404);
			
		}

		return serviceType;
	}
	
	

	/* ----------------------------------------------------------------------------
		POST create serviceType
	---------------------------------------------------------------------------- */
	@PostMapping(path="servicetype")
	public ServiceType create(
		HttpServletRequest req, 
		HttpServletResponse res,
		Principal principal,
		@RequestBody ServiceType serviceType
	) {
		try {
			serviceType = serviceTypeService.create(principal.getName(),serviceType);
			res.setStatus(201);
			
			StringBuffer url = req.getRequestURL();
			url.append("/").append(serviceType.getId());
			res.setHeader("Location",url.toString());
			
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("Invalid ServiceType sent to create");
			res.setStatus(400);
			serviceType = null;
			
		}
		
		return serviceType;
	}
	
	

	/* ----------------------------------------------------------------------------
		PUT update serviceType
	---------------------------------------------------------------------------- */
	@PutMapping("servicetype/{id}")
	public ServiceType update(
		@PathVariable int id,
		@RequestBody ServiceType serviceType,
		HttpServletResponse res,
		Principal principal
	) {
		try {
			serviceType = serviceTypeService.update(principal.getName(), id, serviceType);
			if (serviceType == null) {
				res.setStatus(404);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("Invalid ServiceType sent to update");
			res.setStatus(400);
			serviceType = null;
			
		}
		
		return serviceType;
	}
	
	/* ----------------------------------------------------------------------------
		DELETE serviceType
	---------------------------------------------------------------------------- */
	@DeleteMapping("servicetype/{id}")
	public void delete(
		@PathVariable int id,
		HttpServletResponse res,
		Principal principal
	) {
		if (serviceTypeService.existsById(id)) {
			if (serviceTypeService.deleteById(principal.getName(),id)) {
				res.setStatus(204);
				
			} else {
				res.setStatus(409);
				
			}
			
		} else {
			res.setStatus(404);
			
		}
		
	}
}
