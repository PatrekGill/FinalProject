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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="service_call")
public class ServiceCall {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "problem_description")
	private String problemDescription;
	
	@Column(name = "date_created")
	private LocalDateTime dateCreated;
	
	@Column(name = "date_scheduled")
	private LocalDateTime dateScheduled;
	
	@Column(name = "hours_labor")
	private int hoursLabor;
	
	@Column(name = "total_cost")
	private double totalCost;
	
	@Column(name = "contractor_notes")
	private String contractorNotes;
	
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
	@OneToMany(mappedBy = "serviceCall")
	private List<ServiceComment> comments;
		
	@ManyToOne
	@JoinColumn(name = "business_id")
	private Business business;
	 
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	private boolean completed;
	private boolean estimate;

	/* ----------------------------------------------------------------------------
		Constructors
	---------------------------------------------------------------------------- */
	public ServiceCall() {}
	

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
		Get/Set Problem description
	---------------------------------------------------------------------------- */
	public String getProblemDescription() {
		return problemDescription;
	}
	public void setProblemDescription(String problemDescription) {
		this.problemDescription = problemDescription;
	}

	/* ----------------------------------------------------------------------------
		Get/Set date created
	---------------------------------------------------------------------------- */
	public LocalDateTime getDateCreated() {
		return dateCreated;
	}
	public void setDateCreated(LocalDateTime dateCreated) {
		this.dateCreated = dateCreated;
	}

	/* ----------------------------------------------------------------------------
		Get/Set date scheduled
	---------------------------------------------------------------------------- */
	public LocalDateTime getDateScheduled() {
		return dateScheduled;
	}
	public void setDateScheduled(LocalDateTime dateScheduled) {
		this.dateScheduled = dateScheduled;
	}

	/* ----------------------------------------------------------------------------
		Get/Set completed
	---------------------------------------------------------------------------- */
	public boolean isCompleted() {
		return completed;
	}
	public void setCompleted(boolean completed) {
		this.completed = completed;
	}

	/* ----------------------------------------------------------------------------
		Get/Set totalcost
	---------------------------------------------------------------------------- */
	public double getTotalCost() {
		return totalCost;
	}
	public void setTotalCost(double totalCost) {
		this.totalCost = totalCost;
	}


	/* ----------------------------------------------------------------------------
		Get/Set estimate
	---------------------------------------------------------------------------- */
	public boolean isEstimate() {
		return estimate;
	}
	public void setEstimate(boolean estimate) {
		this.estimate = estimate;
	}

	/* ----------------------------------------------------------------------------
		Get/Set hours labor
	---------------------------------------------------------------------------- */
	public int getHoursLabor() {
		return hoursLabor;
	}
	public void setHoursLabor(int hoursLabor) {
		this.hoursLabor = hoursLabor;
	}

	/* ----------------------------------------------------------------------------
		Get/Set contractor notes
	---------------------------------------------------------------------------- */
	public String getContractorNotes() {
		return contractorNotes;
	}
	public void setContractorNotes(String contractorNotes) {
		this.contractorNotes = contractorNotes;
	}


	/* ----------------------------------------------------------------------------
		Get/Set address
	---------------------------------------------------------------------------- */
	public Address getAddress() {
		return address;
	}
	public void setAddress(Address address) {
		this.address = address;
	}


	/* ----------------------------------------------------------------------------
		Get/Set problem
	---------------------------------------------------------------------------- */
	public Problem getProblem() {
		return problem;
	}
	public void setProblem(Problem problem) {
		this.problem = problem;
	}

	
	/* ----------------------------------------------------------------------------
		Get/Set solution
	---------------------------------------------------------------------------- */
	public Solution getSolution() {
		return solution;
	}
	public void setSolution(Solution solution) {
		this.solution = solution;
	}

	
	/* ----------------------------------------------------------------------------
		Get/Set comments
	---------------------------------------------------------------------------- */
	public List<ServiceComment> getComments() {
		return comments;
	}
	public void setComments(List<ServiceComment> comments) {
		this.comments = comments;
	}


	/* ----------------------------------------------------------------------------
		Get/Set comments
	---------------------------------------------------------------------------- */
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}

/* ----------------------------------------------------------------------------
	Get/Set business
---------------------------------------------------------------------------- */
	public Business getBusiness() {
		return business;
	}
	public void setBusiness(Business business) {
		this.business = business;
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
		ServiceCall other = (ServiceCall) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "Service [id=" + id + ", problemDescription=" + problemDescription + ", completed=" + completed
				+ ", totalCost=" + totalCost + ", estimate=" + estimate + ", hoursLabor=" + hoursLabor
				+ ", contractorNotes=" + contractorNotes + ", address=" + address + "]";
	}
	
}
