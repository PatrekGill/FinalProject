package com.skilldistillery.monkeywrench.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.skilldistillery.monkeywrench.entities.ServiceCall;
import com.skilldistillery.monkeywrench.repositories.ServiceCallRepository;

@org.springframework.stereotype.Service
public class ServiceCallServiceImpl implements ServiceCallService{

	@Autowired
	private ServiceCallRepository serviceCallRepo;
	
	@Override
	public List<ServiceCall> getAllServiceCall() {
		return serviceCallRepo.findAll();
	}
	
	@Override
	public ServiceCall getServiceCallById(int serviceCallId) {
		return serviceCallRepo.getById(serviceCallId);
	}

	@Override
	public ServiceCall updateServiceCallById(ServiceCall sCall, int scId) {
		Optional<ServiceCall> sCallOpt = serviceCallRepo.findById(scId);
		ServiceCall updatedCall = null;
		if(sCallOpt.isPresent()) {
			updatedCall.setAddress(sCall.getAddress());
			updatedCall.setProblem(sCall.getProblem());
			updatedCall.setSolution(sCall.getSolution());
			updatedCall.setProblemDescription(sCall.getProblemDescription());
			updatedCall.setDateCreated(sCall.getDateCreated());
			updatedCall.setDateScheduled(sCall.getDateScheduled());
			updatedCall.setCompleted(sCall.isCompleted());
			updatedCall.setTotalCost(sCall.getTotalCost());
			updatedCall.setEstimate(sCall.isEstimate());
			updatedCall.setHoursLabor(sCall.getHoursLabor());
			updatedCall.setContractorNotes(sCall.getContractorNotes());
			updatedCall.setBusiness(sCall.getBusiness());
			updatedCall.setUser(sCall.getUser());
			updatedCall.setCustomerRating(sCall.getCustomerRating());
			updatedCall.setCustomerRatingComment(sCall.getCustomerRatingComment());
			serviceCallRepo.saveAndFlush(updatedCall);
		}
		return updatedCall;
	}
	
	@Override
	public ServiceCall createNewServiceCall(ServiceCall serviceCall) {
		serviceCall.setEstimate(false);
		serviceCall.setCompleted(false);
		return serviceCallRepo.save(serviceCall);
	}

	@Override
	public boolean deleteServiceCall(int serviceCallId) {
		// TODO Auto-generated method stub
		return false;
	}





}
