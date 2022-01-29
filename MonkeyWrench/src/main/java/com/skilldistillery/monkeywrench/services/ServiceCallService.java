package com.skilldistillery.monkeywrench.services;

import java.util.List;

import com.skilldistillery.monkeywrench.entities.ServiceCall;

public interface ServiceCallService {

	// Get List of Services(All)
	List<ServiceCall> getAllServiceCall();
	
	// Find by Service ID
	ServiceCall getServiceCallById(int serviceCallId);
	
	// Create Service
	ServiceCall createNewServiceCall(ServiceCall serviceCall);
	
	// Update Service
	ServiceCall updateServiceCallById(ServiceCall serviceCall, int serviceCallId);
	
	// Delete Service
	boolean deleteServiceCall(int serviceCallId);
	
	// Find by User id
	List<ServiceCall> findCallsByUserId(int userId);
	
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
