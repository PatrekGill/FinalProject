package com.skilldistillery.monkeywrench.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.monkeywrench.entities.ServiceComment;
import com.skilldistillery.monkeywrench.services.ServiceCommentService;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost:4300"})
public class ServiceCommentController {

	@Autowired
	private ServiceCommentService serviceCommentServ;
	
	@GetMapping("servicecomment")
	public List<ServiceComment> index() {
		return serviceCommentServ.getAllServiceComments();
	}
	
	@GetMapping("servicecomment/{serviceCommentId}")
	public ServiceComment getServiceCommentById(@PathVariable Integer serviceCommentId,
			HttpServletResponse res) {
		ServiceComment serviceComment = serviceCommentServ.getServiceCommentById(serviceCommentId);
		if(serviceComment == null) {
			res.setStatus(404);
		}
		return serviceComment;
	}
	
	@PostMapping("servicecomment")
	public ServiceComment addServiceComment(@RequestBody ServiceComment serviceComment, HttpServletResponse res, HttpServletRequest req) {
		try {
			serviceComment = serviceCommentServ.addServiceComment(serviceComment);
			res.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(serviceComment.getId());
			res.setHeader("Location", url.toString());
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("Invalid ServiceComment sent");
			res.setStatus(400);
			serviceComment = null;
		}
		return serviceComment;
	}
	
	@PutMapping("servicecomment/{serviceCommentId}")
	public ServiceComment updateServiceComment(@RequestBody ServiceComment serviceComment, @PathVariable int serviceCommentId, HttpServletResponse res) {
		try {
			serviceComment = serviceCommentServ.updateServiceComment(serviceCommentId, serviceComment);
			if(serviceComment == null) {
				res.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			serviceComment = null;
		}
		return serviceComment;
	}
	
	@DeleteMapping("servicecomment/{serviceCommentId}")
	public void deleteServiceComment(@PathVariable int serviceCommentId, HttpServletResponse res) {
		try {
			if(serviceCommentServ.deleteServiceComment(serviceCommentId)) {
				res.setStatus(204);
			}
			else {
				res.setStatus(404);
			}
		}
		catch(Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
	}
	
	
}

