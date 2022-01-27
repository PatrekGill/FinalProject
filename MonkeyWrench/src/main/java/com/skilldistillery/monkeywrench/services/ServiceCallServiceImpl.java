package com.skilldistillery.monkeywrench.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.monkeywrench.entities.ServiceCall;
import com.skilldistillery.monkeywrench.repositories.ServiceCallRepository;

@Service
public class ServiceCallServiceImpl implements ServiceCallService{

	@Autowired
	private ServiceCallRepository serviceCallRepo;
	
	@Override
	public List<ServiceCall> getAllServiceCall() {
		return serviceCallRepo.findAll();
	}
	
	@Override
	public ServiceCall getServiceCallById(int serviceCallId) {
		return serviceCallRepo.findById(serviceCallId).get();
	}

	@Override
	public ServiceCall updateServiceCallById(ServiceCall sCall, int scId) {
		sCall.setId(scId);
		if(serviceCallRepo.existsById(scId)) {
			return serviceCallRepo.saveAndFlush(sCall);
		}
		
		//		Optional<ServiceCall> sCallOpt = serviceCallRepo.findById(scId);
//		ServiceCall updatedCall = null;
//		if(sCallOpt.isPresent()) {
//			updatedCall = sCallOpt.get();
//		}
		
//		updatedCall.setAddress(sCall.getAddress());
//		updatedCall.setProblem(sCall.getProblem());
//		updatedCall.setSolution(sCall.getSolution());
//		updatedCall.setProblemDescription(sCall.getProblemDescription());
//		updatedCall.setDateCreated(sCall.getDateCreated());
//		updatedCall.setDateScheduled(sCall.getDateScheduled());
//		updatedCall.setCompleted(sCall.isCompleted());
//		updatedCall.setTotalCost(sCall.getTotalCost());
//		updatedCall.setEstimate(sCall.isEstimate());
//		updatedCall.setHoursLabor(sCall.getHoursLabor());
//		updatedCall.setContractorNotes(sCall.getContractorNotes());
//		updatedCall.setBusiness(sCall.getBusiness());
//		updatedCall.setUser(sCall.getUser());
//		updatedCall.setCustomerRating(sCall.getCustomerRating());
//		updatedCall.setCustomerRatingComment(sCall.getCustomerRatingComment());
//		serviceCallRepo.saveAndFlush(updatedCall);
		
		return null;
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
