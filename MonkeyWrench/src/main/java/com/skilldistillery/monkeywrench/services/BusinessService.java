package com.skilldistillery.monkeywrench.services;

import java.util.List;

import com.skilldistillery.monkeywrench.entities.Business;

public interface BusinessService {
	public List<Business> index(String username);

    public Business findById(int id);

    public Business create(String username, Business business);

    public Business update(String username, int id, Business business);

    public boolean existsById(int id);

	boolean deleteById(String username, int id);
}
