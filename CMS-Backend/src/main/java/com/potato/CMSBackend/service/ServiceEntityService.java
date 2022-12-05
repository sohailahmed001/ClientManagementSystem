package com.potato.CMSBackend.service;

import com.potato.CMSBackend.dao.ServiceEntityDao;
import com.potato.CMSBackend.model.ServiceEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceEntityService {

    @Autowired
    private ServiceEntityDao serviceEntityDao;

    public List<ServiceEntity> getServices() {
        return this.serviceEntityDao.findAll();
    }

    public ServiceEntity getServiceById(Long id) {
        return this.serviceEntityDao.findById(id).get();
    }

    public ServiceEntity saveService(ServiceEntity service) {
        return this.serviceEntityDao.save(service);
    }
}
