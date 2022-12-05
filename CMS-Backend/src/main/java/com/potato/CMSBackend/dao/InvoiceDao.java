package com.potato.CMSBackend.dao;

import com.potato.CMSBackend.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvoiceDao extends JpaRepository<Invoice, Long> {
}
