package com.potato.CMSBackend.dao;

import com.potato.CMSBackend.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvoiceDao extends JpaRepository<Invoice, Long> {

    @Query("Select i from Invoice i where i.client.id = :id")
    public List<Invoice> findByClientIdEquals(@Param("id") Long clientId);
}
