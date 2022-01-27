package com.skilldistillery.monkeywrench.services;

import java.util.List;

import com.skilldistillery.monkeywrench.entities.ServiceType;

public interface ServiceTypeService {
	public List<ServiceType> index();

    public ServiceType findById(int id);

    public ServiceType create(String username, ServiceType serviceType);

    public ServiceType update(String username, int id, ServiceType serviceType);

    public boolean existsById(int id);

	boolean deleteById(String username, int id);
}
