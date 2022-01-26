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

class AddressTest {
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Address address;

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
		address = em.find(Address.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		address = null;
	}

	@Test
	void test_address_city_mapping() {
		assertNotNull(address);
		assertEquals("Hanover",address.getCity());
	}
	
	@Test
	void test_address_street_mapping() {
		assertNotNull(address);
		assertEquals("62 Fake St.",address.getStreet());
	}
	
	@Test
	void test_address_street2_mapping() {
		assertNotNull(address);
		assertEquals("unit 1",address.getStreet2());
	}
	
	@Test
	void test_address_stateAbbv_mapping() {
		assertNotNull(address);
		assertEquals("PA",address.getStateAbbv());
	}
	
	@Test
	void test_address_zipcode_mapping() {
		assertNotNull(address);
		assertEquals(99022,address.getZipCode());
	}
	
	@Test
	void test_address_user_mapping() {
		assertNotNull(address);
		assertNotNull(address.getUser());
		assertEquals(1,address.getUser().getId());
	}
	
	@Test
	void test_address_notes_mapping() {
		assertNotNull(address);
		assertNotNull(address.getNotes());
		assertEquals("notes",address.getNotes());
	}
	
	@Test
	void test_address_services_mapping() {
		assertNotNull(address);
		assertNotNull(address.getServices());
		assertFalse(address.getServices().isEmpty());
	}

}
