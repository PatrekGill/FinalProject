package com.skilldistillery.monkeywrench.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.monkeywrench.entities.Business;
import com.skilldistillery.monkeywrench.repositories.BusinessRepository;

@Service
public class BusinessServiceImpl implements BusinessService {
	@Autowired
	private BusinessRepository businessRepo;
	
	@Autowired
	private OptionalRetriever<Business> businessRetriever;

	@Override
	public List<Business> index(String username) {
		return businessRepo.findAll();
	}

	@Override
	public Business show(String username, int tid) {
		return null;
	}

	@Override
	public Business create(String username, Business business) {
		return null;
	}

	@Override
	public Business update(String username, int tid, Business business) {
		return null;
	}

	@Override
	public boolean destroy(String username, int tid) {
		return false;
	}

	@Override
	public boolean existsById(int tid) {
		return false;
	}
	
	
}
