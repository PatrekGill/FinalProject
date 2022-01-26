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

class EquipmentTypeTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private EquipmentType type;

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
		type = em.find(EquipmentType.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		type = null;
	}

	@Test
	void test_EquipmentType_mapping() {
		assertNotNull(type);
		assertEquals("Air Conditioner", type.getType());
	}
	
	@Test
	void test_EquipmentType_To_Model_mapping() {
		assertNotNull(type);
		assertNotNull(type.getModels());
		assertTrue(type.getModels().size() > 0);
	}

}
