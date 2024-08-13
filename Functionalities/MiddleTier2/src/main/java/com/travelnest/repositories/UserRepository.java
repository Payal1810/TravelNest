package com.travelnest.repositories;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.travelnest.entities.Login;
import com.travelnest.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

	
	/*
	 * @Query("select u from User u where u.email = :#{#l.email}") public User
	 * getUser(Login l);
	 */
	 
	List<User> findByAuthorized(int authorized);

	 
    @Query("SELECT u FROM User u WHERE u.role_id.role_id = :roleId")
    List<User> findByRoleId(@Param("roleId") int roleId);

 
 @Query("SELECT u FROM User u LEFT JOIN FETCH u.area WHERE u.user_id = :userId")
 User findUserByIdWithArea(@Param("userId") int userId);

}
