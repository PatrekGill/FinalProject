package com.skilldistillery.monkeywrench.services;

import java.util.List;

import com.skilldistillery.monkeywrench.entities.ServiceComment;

public interface ServiceCommentService {

	public List <ServiceComment> getAllServiceComments();
	public ServiceComment getServiceCommentById(int serviceCommentId);
	public boolean deleteServiceComment(int serviceCommentId);
	public ServiceComment addServiceComment(ServiceComment serviceComment);
	public ServiceComment updateServiceComment(int serviceCommentId, ServiceComment serviceComment);
}
