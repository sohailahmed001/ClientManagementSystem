package com.potato.CMSBackend.service;

import com.potato.CMSBackend.dao.ClientDao;
import com.potato.CMSBackend.dao.InvoiceDao;
import com.potato.CMSBackend.dao.ServiceEntityDao;
import com.potato.CMSBackend.model.Client;
import com.potato.CMSBackend.model.Invoice;
import com.potato.CMSBackend.model.ServiceEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceDao invoiceDao;

    @Autowired
    private ClientDao clientDao;

    @Autowired
    private ServiceEntityDao serviceEntityDao;

    public List<Invoice> getInvoicesByClientId(Long clientId) {
        return invoiceDao.findByClientIdEquals(clientId);
    }

    public Invoice saveInvoice(Invoice invoice) {
        List<ServiceEntity> services = new ArrayList<>();
        Client client = clientDao.findById(invoice.getClient().getId()).get();

        invoice.setClient(client);

        for(ServiceEntity passedService: invoice.getServices()) {
            ServiceEntity service = this.serviceEntityDao.findById(passedService.getId()).get();

            if(service != null) {
                services.add(service);
            }
        }

        invoice.setServices(services);
        return invoiceDao.save(invoice);
    }

    public Invoice getInvoiceById(Long id) {
        return invoiceDao.findById(id).get();
    }
}
