package com.skilldistillery.monkeywrench.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.monkeywrench.entities.Address;
import com.skilldistillery.monkeywrench.entities.User;
import com.skilldistillery.monkeywrench.repositories.AddressRepository;
import com.skilldistillery.monkeywrench.repositories.UserRepository;

@Service
public class AddressServiceImpl implements AddressService {
	@Autowired
	private AddressRepository addressRepo;
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private OptionalRetriever<Address> addressRetriever;

	@Override
	public List<Address> index() {
		return addressRepo.findAll();
	}

	@Override
	public Address findById(int id) {
		return addressRetriever.get(
			addressRepo.findById(id)
		);
	}

	@Override
	public Address create(String username, Address address) {
		User user = userRepo.findByUsername(username);
		if (user != null) {
			if (address.getId() > 0) {
				address.setId(0);
			}
			address = addressRepo.saveAndFlush(address);
			
		} else {
			address = null;
			
		}
		
		return address;
	}

	@Override
	public Address update(String username, int id, Address address) {
		User user = userRepo.findByUsername(username);
		Address managed = null;
		if (existsById(id) && user != null) {
			managed = findById(id);
			boolean isContractor = user.getRole().toLowerCase().equals("contractor");
			boolean isAddressOwner = user != managed.getUser();
			if (!isAddressOwner && !isContractor) {
				managed = null;
				
			} else {
				if (isAddressOwner) {
					managed.setCity(address.getCity());
					managed.setStateAbbv(address.getStateAbbv());
					managed.setStreet(address.getStreet());
					managed.setStreet2(address.getStreet2());
					managed.setZipCode(address.getZipCode());
				}
				
				if (isContractor) {
					managed.setNotes(address.getNotes());
				}
			}
		}
		
		return managed;
	}

	@Override
	public boolean deleteById(String username, int id) {
		boolean deleted = false;
		User user = userRepo.findByUsername(username);
		if (existsById(id) && user != null) {
			Address managed = findById(id);
			if (user == managed.getUser()) {
				try {
					addressRepo.delete(managed);
					if (!existsById(id)) {
						deleted = true;
					}
				} catch (Exception e) {
					System.err.println("Failed to deleted address");
					e.printStackTrace();
				}
				
			}
		}
		
		return deleted;
	}

	@Override
	public boolean existsById(int id) {
		return addressRepo.existsById(id);
	}
}
