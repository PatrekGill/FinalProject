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

import com.skilldistillery.monkeywrench.entities.Address;
import com.skilldistillery.monkeywrench.services.AddressService;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost:4200"})
public class AddressController {
	@Autowired
	private AddressService addressService;

	/* ----------------------------------------------------------------------------
		GET all Addresses
	---------------------------------------------------------------------------- */
	@GetMapping(path="address")
	public List<Address> getAll(
		HttpServletRequest req, 
		HttpServletResponse res
	) {
		return addressService.index();
	}
	

	/* ----------------------------------------------------------------------------
		GET address by Id
	---------------------------------------------------------------------------- */
	@GetMapping("address/{id}")
	public Address getById(
		@PathVariable int id,
		HttpServletResponse res
	) {
		Address address = null;
		if (addressService.existsById(id)) {
			address = addressService.findById(id);
			
		} else {
			res.setStatus(404);
			
		}

		return address;
	}
	
	

	/* ----------------------------------------------------------------------------
		POST create address
	---------------------------------------------------------------------------- */
	@PostMapping(path="address")
	public Address create(
		HttpServletRequest req, 
		HttpServletResponse res,
		Principal principal,
		@RequestBody Address address
	) {
		try {
			address = addressService.create(principal.getName(),address);
			res.setStatus(201);
			
			StringBuffer url = req.getRequestURL();
			url.append("/").append(address.getId());
			res.setHeader("Location",url.toString());
			
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("Invalid address sent to create");
			res.setStatus(400);
			address = null;
			
		}
		
		return address;
	}
	
	

	/* ----------------------------------------------------------------------------
		PUT update address
	---------------------------------------------------------------------------- */
	@PutMapping("address/{id}")
	public Address update(
		@PathVariable int id,
		@RequestBody Address address,
		HttpServletResponse res,
		Principal principal
	) {
		try {
			address = addressService.update(principal.getName(), id, address);
			if (address == null) {
				res.setStatus(404);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("Invalid address sent to update");
			res.setStatus(400);
			address = null;
			
		}
		
		return address;
	}
	
	/* ----------------------------------------------------------------------------
		DELETE address
	---------------------------------------------------------------------------- */
	@DeleteMapping("address/{id}")
	public void delete(
		@PathVariable int id,
		HttpServletResponse res,
		Principal principal
	) {
		if (addressService.existsById(id)) {
			if (addressService.deleteById(principal.getName(),id)) {
				res.setStatus(204);
				
			} else {
				res.setStatus(409);
				
			}
			
		} else {
			res.setStatus(404);
			
		}
		
	}
}
