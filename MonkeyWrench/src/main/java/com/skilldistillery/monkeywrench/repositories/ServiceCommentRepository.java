package com.skilldistillery.monkeywrench.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.monkeywrench.entities.ServiceComment;

public interface ServiceCommentRepository extends JpaRepository<ServiceComment, Integer> {
	ServiceComment findById(int serviceCommentId);
}
