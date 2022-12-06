package com.potato.CMSBackend.controller;

import com.potato.CMSBackend.model.Invoice;
import com.potato.CMSBackend.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/api/v1/invoice"})
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    @GetMapping({"/get/client/{clientId}"})
    public List<Invoice> getInvoicesByClientId(@PathVariable Long clientId) {
        return invoiceService.getInvoicesByClientId(clientId);
    }

    @GetMapping({"/get/{id}"})
    public Invoice getInvoiceById(@PathVariable Long id) {
        return invoiceService.getInvoiceById(id);
    }

    @PostMapping({"/add"})
    public Invoice getInvoiceById(@RequestBody Invoice invoice) {
        return invoiceService.saveInvoice(invoice);
    }
}
