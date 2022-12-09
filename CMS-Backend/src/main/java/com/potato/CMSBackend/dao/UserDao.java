package com.potato.CMSBackend.dao;

import com.potato.CMSBackend.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserDao extends CrudRepository<User, String> {

    public List<User> findByUsernameContainingIgnoreCase(@Param("username") String username);
}
