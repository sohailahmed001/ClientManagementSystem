package com.potato.CMSBackend.service;

import com.potato.CMSBackend.configuration.JwtRequestFilter;
import com.potato.CMSBackend.controller.ClientController;
import com.potato.CMSBackend.dao.ClientDao;
import com.potato.CMSBackend.dao.UserDao;
import com.potato.CMSBackend.model.Client;
import com.potato.CMSBackend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;


@Service
public class ClientService {

    private static final String STATIC_RESOURCE_PATH = "/src/main/resources/static";
    private static final String IMAGES_DIR = "/images";
    private static final String UPLOAD_DIRECTORY = System.getProperty("user.dir") + STATIC_RESOURCE_PATH + IMAGES_DIR;

    @Autowired
        ServletContext context;

    @Autowired
    private UserDao userDao;

    @Autowired
    private ClientDao clientDao;

    public Client addClient(Client client, MultipartFile[] files, HttpServletRequest req) {
        if(client.getUser() == null) {
            User currentUser = this.userDao.findById(JwtRequestFilter.CURRENT_USER).get();
            client.setUser(currentUser);
        }
        if(files != null && files.length > 0) {
            for(MultipartFile file: files) {
                processImage(file, client);
            }
        }
        return this.clientDao.save(client);
    }

    public Client getClientById(Long id) {
        return this.clientDao.findById(id).get();
    }

    public List<Client> getClients() {
        return this.clientDao.findAll();
    }

    private void processImage(MultipartFile file, Client client) {
        try {
            String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
            StringBuilder fileNames = new StringBuilder();
            Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY, file.getOriginalFilename());
            System.out.println(fileNameAndPath.toString());
            System.out.println(context.getRealPath("/"));
            System.out.println(context.getContextPath());

            fileNames.append(file.getOriginalFilename());
            System.out.println(fileNames.toString());
            Files.write(fileNameAndPath, file.getBytes());
            System.out.println(file.getBytes().toString());
            client.setImageUrl(baseUrl + IMAGES_DIR + "/" + fileNames.toString());

        } catch (IOException e) {
            e.printStackTrace();
            throw new IllegalStateException("Couldn't save image");
        }
    }
}
