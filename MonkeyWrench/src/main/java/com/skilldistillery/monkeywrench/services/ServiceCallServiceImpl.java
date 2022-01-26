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
	public List<ServiceCall> getAllService() {
		return serviceCallRepo.findAll();
	}
	
	@Override
	public ServiceCall getServiceById(int serviceId) {
		return serviceCallRepo.getById(serviceId);
	}

	@Override
	public ServiceCall updateServiceById(ServiceCall service, int serviceId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean deleteService(int serviceId) {
		// TODO Auto-generated method stub
		return false;
	}



}
