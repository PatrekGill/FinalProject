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

class SolutionTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Solution solution;

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
		solution = em.find(Solution.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		solution = null;
	}

	@Test
	void test_Solution_mapping() {
		assertNotNull(solution);
		assertEquals("ADDED REFRIDGERANT", solution.getDescription());
	}
	
	@Test
	void test_Solution_To_Service_mapping() {
		assertNotNull(solution);
		assertNotNull(solution.getServices());
		assertTrue(solution.getServices().size() > 0);
	}

}
