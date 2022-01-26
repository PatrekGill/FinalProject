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

class ServiceCommentTest {
	private static EntityManagerFactory emf;
	private EntityManager em;
	private ServiceComment comment;

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
		comment = em.find(ServiceComment.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		comment = null;
	}

	@Test
	void test_comment_text_mapping() {
		assertNotNull(comment);
		assertNotNull(comment.getText());
		assertEquals("fix my stuff",comment.getText());
	}
	
	@Test
	void test_comment_user_mapping() {
		assertNotNull(comment);
		assertNotNull(comment.getUser());
		assertEquals(2,comment.getUser().getId());
	}
	
	@Test
	void test_comment_service_mapping() {
		assertNotNull(comment);
		assertNotNull(comment.getService());
		assertEquals(1,comment.getService().getId());
	}
	
	@Test
	void test_comment_date_mapping() {
		assertNotNull(comment);
		assertNotNull(comment.getCommentDate());
		assertEquals(2022,comment.getCommentDate().getYear());
	}

}
