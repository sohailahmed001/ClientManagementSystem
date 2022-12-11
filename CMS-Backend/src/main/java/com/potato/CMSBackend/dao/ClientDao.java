package com.potato.CMSBackend.dao;

import com.potato.CMSBackend.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientDao extends JpaRepository<Client, Long> {

    public List<Client> findByLastNameStartsWithOrFirstNameStartsWithOrEmailStartsWithAllIgnoreCase(
            @Param("firstName") String username,
            @Param("lastName") String lastName,
            @Param("email") String email
    );

}
