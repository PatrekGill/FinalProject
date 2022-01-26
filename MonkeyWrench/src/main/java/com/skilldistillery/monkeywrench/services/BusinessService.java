package com.skilldistillery.monkeywrench.services;

import java.util.List;

import com.skilldistillery.monkeywrench.entities.Business;

public interface BusinessService {
	public List<Business> index(String username);

    public Business show(String username, int tid);

    public Business create(String username, Business business);

    public Business update(String username, int tid, Business business);

    public boolean destroy(String username, int tid);
    
    public boolean existsById(int tid);
}
