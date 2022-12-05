package com.potato.CMSBackend.service;

import com.potato.CMSBackend.dao.ClientDao;
import com.potato.CMSBackend.dao.UserDao;
import com.potato.CMSBackend.model.Client;
import com.potato.CMSBackend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private ClientDao clientDao;

    public Client addClient(Client client) {
        User user = this.userDao.findById(client.getUser().getUsername()).get();
        client.setUser(user);

        return this.clientDao.save(client);
    }

    public Client getClientById(Long id) {
        return this.clientDao.findById(id).get();
    }

    public List<Client> getClients() {
        return this.clientDao.findAll();
    }
}
