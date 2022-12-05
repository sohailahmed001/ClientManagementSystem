package com.potato.CMSBackend.controller;

import com.potato.CMSBackend.model.Client;
import com.potato.CMSBackend.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/api/v1/client"})
public class ClientController {

    @Autowired
    private ClientService clientService;

    @PostMapping({"/add"})
    public Client addClient(@RequestBody Client client) {
        return this.clientService.addClient(client);
    }

    @GetMapping({"/get/{id}"})
    public Client getClientById(@PathVariable Long id) {
        return this.clientService.getClientById(id);
    }

    @GetMapping({"/getAll"})
    public List<Client> getClients() {
        return this.clientService.getClients();
    }
}
