package com.skilldistillery.monkeywrench.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.monkeywrench.entities.Business;
import com.skilldistillery.monkeywrench.entities.User;
import com.skilldistillery.monkeywrench.repositories.BusinessRepository;
import com.skilldistillery.monkeywrench.repositories.UserRepository;

@Service
public class BusinessServiceImpl implements BusinessService {
	@Autowired
	private BusinessRepository businessRepo;
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private OptionalRetriever<Business> businessRetriever;

	@Override
	public List<Business> index(String username) {
		return businessRepo.findAll();
	}

	@Override
	public Business findById(int id) {
		return businessRetriever.get(
			businessRepo.findById(id)
		);
	}

	@Override
	public Business create(String username, Business business) {
		User user = userRepo.findByUsername(username);
		if (user != null) {
			if (business.getId() > 0) {
				business.setId(0);
			} 
			
			business.setUser(user);
			business = businessRepo.saveAndFlush(business);
			
		} else {
			business = null;
			
		}
		
		return business;
	}

	@Override
	public Business update(String username, int id, Business business) {
		User user = userRepo.findByUsername(username);
		Business managed = null;
		if (existsById(id) && user != null) {
			managed = findById(id);
			if (user != managed.getUser()) {
				managed = null;
				
			} else {
				managed.setName(business.getName());
				managed.setLogoUrl(business.getLogoUrl());
				
			}
		}
		
		return managed;
	}

	@Override
	public boolean deleteById(String username, int id) {
		boolean deleted = false;
		User user = userRepo.findByUsername(username);
		if (existsById(id) && user != null) {
			Business managed = findById(id);
			if (user == managed.getUser()) {
				managed.setEnabled(false);
				businessRepo.saveAndFlush(managed);
				deleted = true;
			}
		}
		
		return deleted;
	}

	@Override
	public boolean existsById(int id) {
		return businessRepo.existsById(id);
	}
	
	
}
