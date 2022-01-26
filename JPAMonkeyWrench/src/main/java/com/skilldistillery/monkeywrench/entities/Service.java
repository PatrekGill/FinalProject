package com.skilldistillery.monkeywrench.entities;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Service {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "problem_description")
	private String problemDescription;
	
	@Column(name = "date_created")
	private LocalDateTime dateCreated;
	
	@Column(name = "date_scheduled")
	private LocalDateTime dateScheduled;
	
	private boolean completed;
	
	@Column(name = "total_cost")
	private double totalCost;
	
	private boolean estimate;
	
	@Column(name = "hours_labor")
	private int hoursLabor;
	
	@Column(name = "contractor_notes")
	private String contractorNotes;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "address_id")
	private Address address;
	
	@ManyToOne
	@JoinColumn(name = "problem_id")
	private Problem problem;
	
	@ManyToOne
	@JoinColumn(name = "solution_id")
	private Solution solution;
	
	@JsonIgnore
	@OneToMany(mappedBy = "service")
	private List<ServiceComment> comments;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getProblemDescription() {
		return problemDescription;
	}

	public void setProblemDescription(String problemDescription) {
		this.problemDescription = problemDescription;
	}

	public LocalDateTime getDateCreated() {
		return dateCreated;
	}

	public void setDateCreated(LocalDateTime dateCreated) {
		this.dateCreated = dateCreated;
	}

	public LocalDateTime getDateScheduled() {
		return dateScheduled;
	}

	public void setDateScheduled(LocalDateTime dateScheduled) {
		this.dateScheduled = dateScheduled;
	}

	public boolean isCompleted() {
		return completed;
	}

	public void setCompleted(boolean completed) {
		this.completed = completed;
	}

	public double getTotalCost() {
		return totalCost;
	}

	public void setTotalCost(double totalCost) {
		this.totalCost = totalCost;
	}

	public boolean isEstimate() {
		return estimate;
	}

	public void setEstimate(boolean estimate) {
		this.estimate = estimate;
	}

	public int getHoursLabor() {
		return hoursLabor;
	}

	public void setHoursLabor(int hoursLabor) {
		this.hoursLabor = hoursLabor;
	}

	public String getContractorNotes() {
		return contractorNotes;
	}

	public void setContractorNotes(String contractorNotes) {
		this.contractorNotes = contractorNotes;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public Problem getProblem() {
		return problem;
	}

	public void setProblem(Problem problem) {
		this.problem = problem;
	}

	public Solution getSolution() {
		return solution;
	}

	public void setSolution(Solution solution) {
		this.solution = solution;
	}

	public List<ServiceComment> getComments() {
		return comments;
	}

	public void setComments(List<ServiceComment> comments) {
		this.comments = comments;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

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
		Service other = (Service) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "Service [id=" + id + ", problemDescription=" + problemDescription + ", completed=" + completed
				+ ", totalCost=" + totalCost + ", estimate=" + estimate + ", hoursLabor=" + hoursLabor
				+ ", contractorNotes=" + contractorNotes + ", address=" + address + "]";
	}
	
	
	
	
}
