package com.skilldistillery.monkeywrench.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ServiceTypeTest {
	private static EntityManagerFactory emf;
	private EntityManager em;
	private ServiceType serviceType;

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
		serviceType = em.find(ServiceType.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		serviceType = null;
	}

	@Test
	void test_ServiceType_name_mapping() {
		assertNotNull(serviceType);
		assertEquals("HVAC Maintenance & Repair", serviceType.getName());
	}
	

	@Test
	void test_servicetype_to_business_mapping() {
		assertNotNull(serviceType);
		assertNotNull(serviceType.getBusinesses());
		assertTrue(serviceType.getBusinesses().size() > 0);
	}
	
}
