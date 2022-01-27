package com.skilldistillery.monkeywrench.services;

import java.util.List;

import com.skilldistillery.monkeywrench.entities.Address;

public interface AddressService {
	public List<Address> index();

    public Address findById(int id);

    public Address create(String username, Address address);

    public Address update(String username, int id, Address address);

    public boolean existsById(int id);

	boolean deleteById(String username, int id);
}
