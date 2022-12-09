package com.potato.CMSBackend.controller;

import com.potato.CMSBackend.model.Client;
import com.potato.CMSBackend.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping({"/api/v1/client"})
public class ClientController {

    @Autowired
    private ClientService clientService;

    @PostMapping(value = {"/add"}, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Client addClient(@RequestPart("client") Client client,
                            @RequestPart("imageFile") MultipartFile[] files,
                            HttpServletRequest req) {
        return this.clientService.addClient(client, files, req);
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
