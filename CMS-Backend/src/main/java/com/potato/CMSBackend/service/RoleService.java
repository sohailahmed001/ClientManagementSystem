package com.potato.CMSBackend.service;

import com.potato.CMSBackend.dao.RoleDao;
import com.potato.CMSBackend.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    @Autowired
    private RoleDao roleDao;

    public Role createNewRole(Role role) {
        return roleDao.save(role);
    }
}
