package com.potato.CMSBackend.service;

import com.potato.CMSBackend.dao.RoleDao;
import com.potato.CMSBackend.dao.UserDao;
import com.potato.CMSBackend.model.Client;
import com.potato.CMSBackend.model.Role;
import com.potato.CMSBackend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserService {
    @Autowired
    private UserDao userDao;

    @Autowired
    private RoleDao roleDao;

    @Autowired
    private ClientService clientService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerNewUser(User user) {
        Role role = roleDao.findById("User").get();
        Set<Role> roles = new HashSet<>();

        roles.add(role);
        user.setRole(roles);
        user.setUserPassword(getEncodedPassword(user.getUserPassword()));

        addClient(user.getUserFirstName(), user.getUserLastName(), user);
        return userDao.save(user);
    }

    private void addClient(String firstName, String lastName, User user) {
        Client client = new Client();

        client.setFirstName(firstName);
        client.setLastName(lastName);
        client.setUser(user);

        this.clientService.addClient(client);
    }

    public void initRolesAndUsers() {
        Role adminRole = new Role();
        adminRole.setRoleName("Admin");
        adminRole.setRoleDescription("Role for admin");
        roleDao.save(adminRole);

        Role userRole = new Role();
        userRole.setRoleName("User");
        userRole.setRoleDescription("Default role for new user");
        roleDao.save(userRole);

        User adminUser = new User();
        adminUser.setUserFirstName("admin");
        adminUser.setUserLastName("admin");
        adminUser.setUsername("admin123");
        adminUser.setUserPassword(getEncodedPassword("admin@pass"));
        Set<Role> adminRoles = new HashSet<>();
        adminRoles.add(adminRole);
        adminUser.setRole(adminRoles);
        userDao.save(adminUser);

        User user = new User();
        user.setUserFirstName("Amy");
        user.setUserLastName("Adams");
        user.setUsername("amy123");
        user.setUserPassword(getEncodedPassword("amy@pass"));
        Set<Role> userRoles = new HashSet<>();
        userRoles.add(userRole);
        user.setRole(userRoles);
        userDao.save(user);
    }

    public String getEncodedPassword(String password) {
        return passwordEncoder.encode(password);
    }
}
