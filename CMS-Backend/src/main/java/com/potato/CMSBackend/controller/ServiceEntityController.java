package com.potato.CMSBackend.controller;

import com.potato.CMSBackend.model.ServiceEntity;
import com.potato.CMSBackend.service.ServiceEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/api/v1/service"})
public class ServiceEntityController {

    @Autowired
    private ServiceEntityService serviceEntityService;

    @GetMapping({"/getAll"})
    public List<ServiceEntity> getServices() {
        return this.serviceEntityService.getServices();
    }

    @GetMapping({"/get/{id}"})
    public ServiceEntity getServiceById(@PathVariable Long id) {
        return this.serviceEntityService.getServiceById(id);
    }

    @PostMapping({"/add"})
    public ServiceEntity addService(@RequestBody ServiceEntity service) {
        return this.serviceEntityService.saveService(service);
    }

    @DeleteMapping({"/delete/{id}"})
    public void deleteServiceById(@PathVariable Long id) {
        this.serviceEntityService.deleteServiceById(id);
    }
}
