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

class BusinessTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Business business;

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
		business = em.find(Business.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		business = null;
	}

	@Test
	void test_Business_name_mapping() {
		assertNotNull(business);
		assertEquals("CJ's", business.getBusinessName());
	}
	
	@Test
	void test_Business_CreatedDate_mapping() {
		assertNotNull(business);
		assertEquals(7 , business.getCreatedDate().getDayOfMonth());
		assertEquals(1, business.getCreatedDate().getMonthValue());
		assertEquals(2022, business.getCreatedDate().getYear());
	}
	
	@Test
	void test_Business_UpdatedDate_mapping() {
		assertNotNull(business);
		assertEquals(7, business.getUpdatedDate().getDayOfMonth());
	}
	
	@Test
	void test_Business_logo_mapping() {
		assertNotNull(business);
		assertTrue(business.getLogoUrl().contains("https"));
	}
	
	@Test
	void test_Business_enabled_mapping() {
		assertNotNull(business);
		assertTrue(business.isEnabled());
	}
	
	@Test
	void test_Business_users_mapping() {
		assertNotNull(business);
		assertNotNull(business.getUsers());
		assertFalse(business.getUsers().isEmpty());
	}
	
	@Test
	void test_Business_serviceTypes_mapping() {
		assertNotNull(business);
		assertNotNull(business.getServiceTypes());
		assertFalse(business.getServiceTypes().isEmpty());
	}
	
}
