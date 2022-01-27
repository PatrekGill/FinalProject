package com.skilldistillery.monkeywrench.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.monkeywrench.entities.ServiceComment;
import com.skilldistillery.monkeywrench.repositories.ServiceCommentRepository;

@Service
public class ServiceCommentServiceImpl implements ServiceCommentService {
	
	@Autowired
	private ServiceCommentRepository serviceCommentRepo;
	
	@Override
	public List<ServiceComment> getAllServiceComments() {
		return serviceCommentRepo.findAll();
	}

	@Override
	public ServiceComment getServiceCommentById(int serviceCommentId) {
		return serviceCommentRepo.findById(serviceCommentId);
	}

	@Override
	public boolean deleteServiceComment(int serviceCommentId) {
		serviceCommentRepo.deleteById(serviceCommentId);
		return true;
	}

	@Override
	public ServiceComment addServiceComment(ServiceComment serviceComment) {
		return serviceCommentRepo.saveAndFlush(serviceComment);
	}

	@Override
	public ServiceComment updateServiceComment(int serviceCommentId, ServiceComment serviceComment) {
		serviceComment.setId(serviceCommentId);
		if(serviceCommentRepo.existsById(serviceCommentId)) {
			
			return serviceCommentRepo.saveAndFlush(serviceComment);
		}
		return null;
	}


}
