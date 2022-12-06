package com.potato.CMSBackend.service;

import com.potato.CMSBackend.dao.ClientDao;
import com.potato.CMSBackend.dao.InvoiceDao;
import com.potato.CMSBackend.model.Client;
import com.potato.CMSBackend.model.Invoice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceDao invoiceDao;

    @Autowired
    private ClientDao clientDao;

    public List<Invoice> getInvoicesByClientId(Long clientId) {
        return invoiceDao.findByClientIdEquals(clientId);
    }

    public Invoice saveInvoice(Invoice invoice) {
        Client client = clientDao.findById(invoice.getClient().getId()).get();
        invoice.setClient(client);

        return invoiceDao.save(invoice);
    }

    public Invoice getInvoiceById(Long id) {
        return invoiceDao.findById(id).get();
    }
}
