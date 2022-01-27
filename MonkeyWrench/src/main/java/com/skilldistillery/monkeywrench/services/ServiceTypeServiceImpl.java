package com.skilldistillery.monkeywrench.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.monkeywrench.entities.ServiceType;
import com.skilldistillery.monkeywrench.entities.User;
import com.skilldistillery.monkeywrench.repositories.ServiceTypeRepository;
import com.skilldistillery.monkeywrench.repositories.UserRepository;

@Service
public class ServiceTypeServiceImpl implements ServiceTypeService {
	@Autowired
	private ServiceTypeRepository serviceTypeRepo;
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private OptionalRetriever<ServiceType> serviceTypeRetriever;
	
	private boolean isAdmin(User user) {
		if (user != null) {
			return user.getRole().toLowerCase().equals("admin");
		}
		
		return false;
	}
	
	@Override
	public List<ServiceType> index() {
		return serviceTypeRepo.findAll();
	}

	@Override
	public ServiceType findById(int id) {
		return serviceTypeRetriever.get(
			serviceTypeRepo.findById(id)
		);
	}

	@Override
	public ServiceType create(String username, ServiceType serviceType) {
		if (isAdmin(userRepo.findByUsername(username))) {
			if (serviceType.getId() > 0) {
				serviceType.setId(0);
			}
			
			serviceType = serviceTypeRepo.saveAndFlush(serviceType);
			
		} else {
			serviceType = null;
			
		}
		
		return serviceType;
	}

	@Override
	public ServiceType update(String username, int id, ServiceType serviceType) {
		User user = userRepo.findByUsername(username);
		ServiceType managed = null;
		if (existsById(id) && isAdmin(user)) {
			managed = findById(id);
			managed.setName(serviceType.getName());
			managed.setDescription(serviceType.getDescription());
			
			managed = serviceTypeRepo.saveAndFlush(managed);
		}
		
		return managed;
	}

	@Override
	public boolean deleteById(String username, int id) {
		boolean deleted = false;
		User user = userRepo.findByUsername(username);
		if (existsById(id) && isAdmin(user)) {
			ServiceType managed = findById(id);
			try {
				serviceTypeRepo.delete(managed);
				if (!existsById(id)) {
					deleted = true;
				}
				
			} catch (Exception e) {
				System.err.println("Failed to delete ServiceType");
				e.printStackTrace();
			}
				
		}
		
		return deleted;
	}

	@Override
	public boolean existsById(int id) {
		return serviceTypeRepo.existsById(id);
	}
}
