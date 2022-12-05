package com.potato.CMSBackend.service;

import com.potato.CMSBackend.dao.InvoiceDao;
import com.potato.CMSBackend.model.Invoice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceDao invoiceDao;
}
