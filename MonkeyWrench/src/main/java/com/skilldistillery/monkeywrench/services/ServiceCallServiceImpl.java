package com.skilldistillery.monkeywrench.services;

import java.util.List;

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
	public ServiceCall updateServiceCallById(ServiceCall serviceCall, int serviceCallId) {
		// TODO Auto-generated method stub
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
