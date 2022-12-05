package com.potato.CMSBackend.model;

import javax.persistence.*;

@Entity
@Table(name = "service")
public class ServiceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String serviceName;
    private String description;
    private Double price;

    public ServiceEntity(String serviceName, String description, Double price) {
        this.serviceName = serviceName;
        this.description = description;
        this.price = price;
    }

    public ServiceEntity() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
