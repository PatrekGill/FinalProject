package com.skilldistillery.monkeywrench.services;

import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class OptionalRetriever<T> {
	public T get(Optional<T> optional) {
		T returnObject = null;
		if (optional.isPresent()) {
			returnObject = optional.get();
		}
		
		return returnObject;
	}
}
