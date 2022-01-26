package com.skilldistillery.monkeywrench.entities;

import java.time.LocalDateTime;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name="service_comment")
public class ServiceComment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne
	@JoinColumn (name = "user_id")
	private User user;
	
	@ManyToOne
	@JoinColumn (name = "service_id")
	private ServiceCall serviceCall;
	
	@CreationTimestamp
	@Column (name = "comment_date")
	private LocalDateTime commentDate;
	
	private String text;

	
	/* ----------------------------------------------------------------------------
		Constructors
	---------------------------------------------------------------------------- */
	public ServiceComment() {}
	

	/* ----------------------------------------------------------------------------
		Get/Set ID
	---------------------------------------------------------------------------- */
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}

	
	/* ----------------------------------------------------------------------------
		Get/Set Text
	---------------------------------------------------------------------------- */
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}

	
	/* ----------------------------------------------------------------------------
		Get/Set User
	---------------------------------------------------------------------------- */
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}

	
	/* ----------------------------------------------------------------------------
		Get/Set Service
	---------------------------------------------------------------------------- */
	public ServiceCall getServiceCall() {
		return serviceCall;
	}
	public void setServiceCall(ServiceCall serviceCall) {
		this.serviceCall = serviceCall;
	}

	
	/* ----------------------------------------------------------------------------
		Get/Set comment date
	---------------------------------------------------------------------------- */
	public LocalDateTime getCommentDate() {
		return commentDate;
	}
	public void setCommentDate(LocalDateTime commentDate) {
		this.commentDate = commentDate;
	}


	/* ----------------------------------------------------------------------------
		Misc
	---------------------------------------------------------------------------- */
	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ServiceComment other = (ServiceComment) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "ServiceComment [id=" + id + ", text=" + text + ", user=" + user + ", service=" + serviceCall + "]";
	}
	
	
	
}

