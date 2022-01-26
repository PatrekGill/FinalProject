package com.skilldistillery.monkeywrench.entities;

import static org.junit.jupiter.api.Assertions.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ServiceCallTest {
	private static EntityManagerFactory emf;
	private EntityManager em;
	private ServiceCall service;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("JPAMonkeyWrench");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		service = em.find(ServiceCall.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		service = null;
	}

	@Test
	void test_Service_problemDescription_mapping() {
		assertNotNull(service);
		assertNotNull(service.getProblemDescription());
		assertEquals("No heat",service.getProblemDescription());
	}
	
	@Test
	void test_Service_dateCreated_mapping() {
		assertNotNull(service);
		assertNotNull(service.getDateCreated());
		assertEquals(2022,service.getDateCreated().getYear());
	}
	
	@Test
	void test_Service_dateScheduled_mapping() {
		assertNotNull(service);
		assertNotNull(service.getDateScheduled());
		assertEquals(2022,service.getDateScheduled().getYear());
	}
	
	@Test
	void test_Service_hoursLabor_mapping() {
		assertNotNull(service);
		assertEquals(4,service.getHoursLabor());
	}
	
	@Test
	void test_Service_totalCost_mapping() {
		assertNotNull(service);
		assertEquals(12.99,service.getTotalCost());
	}
	
	@Test
	void test_Service_contractorNotes_mapping() {
		assertNotNull(service);
		assertNotNull(service.getContractorNotes());
		assertEquals("stuff happened",service.getContractorNotes());
	}
	
	@Test
	void test_Service_address_mapping() {
		assertNotNull(service);
		assertNotNull(service.getAddress());
		assertEquals("Hanover",service.getAddress().getCity());
	}
	
	@Test
	void test_Service_problem_mapping() {
		assertNotNull(service);
		assertNotNull(service.getProblem());
		assertEquals(1,service.getProblem().getId());
	}
	
	@Test
	void test_Service_comments_mapping() {
		assertNotNull(service);
		assertNotNull(service.getComments());
		assertFalse(service.getComments().isEmpty());
	}
	
	@Test
	void test_Service_User_mapping() {
		assertNotNull(service);
		assertNotNull(service.getUser());
		assertEquals(1,service.getUser().getId());
	}
	
	@Test
	void test_Service_solution_mapping() {
		assertNotNull(service);
		assertNotNull(service.getSolution());
		assertEquals(1,service.getSolution().getId());
	}

}
