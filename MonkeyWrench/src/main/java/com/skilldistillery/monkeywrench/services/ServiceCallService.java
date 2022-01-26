package com.skilldistillery.monkeywrench.services;

import java.util.List;

import com.skilldistillery.monkeywrench.entities.ServiceCall;

public interface ServiceCallService {

	// Get List of Services(All)
	public List<ServiceCall> getAllService();
	
	// Find by Service ID
	public ServiceCall getServiceById(int serviceId);
	
	// Create Service
	
	// Update Service
	public ServiceCall updateServiceById(ServiceCall service, int serviceId);
	
	// Delete Service
	boolean deleteService(int serviceId);
	
	// Find list by like in problem_description
	// Find list by like in contractor_notes
	// Find list by like in customer_comment
	
	// find list by date_created range
	// find list by date_scheduled range
	// find list by date_completed range
	// find list by total_cost
	// find list of if estimates
	// find list by customer_rating
	
	
}
