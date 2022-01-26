package com.skilldistillery.monkeywrench.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class EquipmentTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Equipment equipment;
	
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
		equipment = em.find(Equipment.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		equipment = null;
	}

/*
select * from equipment where id = 1;
+----+---------------+------------+----------+-------+
| id | serial_number | address_id | model_id | price |
+----+---------------+------------+----------+-------+
|  1 | 1234          |          1 |        1 |    50 |
+----+---------------+------------+----------+-------+
 */
	
	@Test
	@DisplayName("test Equipment mapping")
	void test1() {
		assertNotNull(equipment);
		assertEquals("1234", equipment.getSerialNumber());
		assertEquals(50.0, equipment.getPrice());
	}
	
	/*
SELECT e.id AS EquipId, m.id AS ModelId, m.name, m.equipment_type_id, m.model_number, m.fuel_type FROM equipment e 
JOIN model m ON e.model_id = m.id WHERE e.id = 1;
+---------+---------+------+-------------------+--------------+-----------+
| EquipId | ModelId | name | equipment_type_id | model_number | fuel_type |
+---------+---------+------+-------------------+--------------+-----------+
|       1 |       1 | NULL |                 1 | 1234         | Electric  |
+---------+---------+------+-------------------+--------------+-----------+
	 */
	@Test
	@DisplayName("test Equipment to Model ManyToOne mapping")
	void test2() {
		assertNotNull(equipment);
		assertEquals(1, equipment.getModel().getId());
		assertEquals(1, equipment.getModel().getEquipmentType().getId());
		assertEquals("Electric", equipment.getModel().getFuelType());
	}
	
	/*
SELECT e.id AS EquipID, a.id AS AddressID, a.street, a.zip_code FROM equipment e JOIN address a ON
e.address_id = a.id WHERE e.id = 1;
+---------+-----------+-------------+----------+
| EquipID | AddressID | street      | zip_code |
+---------+-----------+-------------+----------+
|       1 |         1 | 62 Fake St. |    99022 |
+---------+-----------+-------------+----------+
	 */
	@Test
	@DisplayName("test Equipment to Address ManyToOne mapping")
	void test3() {
		assertNotNull(equipment);
		assertEquals(1, equipment.getAddress().getId());
		assertEquals("62 Fake St.", equipment.getAddress().getStreet());
		assertEquals(99022, equipment.getAddress().getZipCode());
	}

}
