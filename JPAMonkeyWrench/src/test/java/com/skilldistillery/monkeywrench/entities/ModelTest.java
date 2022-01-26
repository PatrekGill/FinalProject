package com.skilldistillery.monkeywrench.entities;

import static org.junit.jupiter.api.Assertions.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class ModelTest {
	
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Model model;

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
		model = em.find(Model.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		model = null;
	}
	
	/*
SELECT * FROM model WHERE id = 1;
+----+------+-------------------+--------------+-------------+-----------+
| id | name | equipment_type_id | model_number | description | fuel_type |
+----+------+-------------------+--------------+-------------+-----------+
|  1 | NULL |                 1 | 1234         | a big ac    | Electric  |
+----+------+-------------------+--------------+-------------+-----------+ 
	 */
	@Test
	@DisplayName("test model mapping")
	void test1() {
		assertNotNull(model);
		assertEquals("1234", model.getModelNumber());
		assertEquals("Electric", model.getFuelType());
	}
	
	/*
SELECT m.id AS ModelID, e.id AS EquipID, e.type FROM model m JOIN equipment_type e ON m.equipment_type_id = e.id WHERE m.id = 1;
+---------+---------+-----------------+
| ModelID | EquipID | type            |
+---------+---------+-----------------+
|       1 |       1 | Air Conditioner |
+---------+---------+-----------------+
	 */
	@Test
	@DisplayName("test Model to EquipmentType ManyToOne mapping")
	void test2() {
		assertNotNull(model);
		assertEquals("Air Conditioner", model.getEquipmentType().getType());
	}
	
	/*
SELECT m.id AS ModelID, e.id AS EquipID, e.price, e.serial_number FROM model m JOIN equipment e ON m.id = e.model_id WHE
RE m.id = 1;
+---------+---------+-------+---------------+
| ModelID | EquipID | price | serial_number |
+---------+---------+-------+---------------+
|       1 |       1 |    50 | 1234          |
|       1 |       2 |    33 | 1234          |
+---------+---------+-------+---------------+
	 */	
	@Test
	@DisplayName("test Model to Equipment OneToMany mapping")
	void test3() {
		assertNotNull(model);
		assertNotNull(model.getEquipment());
		assertTrue(model.getEquipment().size() > 0);
	}

}
