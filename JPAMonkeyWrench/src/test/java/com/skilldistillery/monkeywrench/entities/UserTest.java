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

class UserTest {
	private static EntityManagerFactory emf;
	private EntityManager em;
	private User user;

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
		user = em.find(User.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		user = null;
	}

	@Test
	void test_User_name_mapping() {
		assertNotNull(user);
		assertEquals("johndoe",user.getUsername());
	}
	
	@Test
	void test_User_password_mapping() {
		assertNotNull(user);
		assertEquals("johndoe",user.getPassword());
	}
	
	@Test
	void test_User_enabled_mapping() {
		assertNotNull(user);
		assertTrue(user.isEnabled());
	}
	
	@Test
	void test_User_role_mapping() {
		assertNotNull(user);
		assertNotNull(user.getRole());
		assertEquals("contractor",user.getRole());
	}
	
	@Test
	void test_User_to_Business_mapping() {
		assertNotNull(user);
		assertNotNull(user.getBusinesses());
		assertTrue(user.getBusinesses().size() > 0);
	}
	
	@Test
	void test_User_to_Service_mapping() {
		assertNotNull(user);
		assertNotNull(user.getServices());
		assertTrue(user.getServices().size() > 0);
	}

}
