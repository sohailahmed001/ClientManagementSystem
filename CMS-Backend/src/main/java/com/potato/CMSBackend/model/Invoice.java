package com.potato.CMSBackend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.math.BigInteger;
import java.util.Collection;

@Entity
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private BigInteger number;
    private String remarks;
    private String paymentStatus;
    @Transient
    private Double subTotal;
    private Integer discount;
    @Transient
    private Double grandTotal;
    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    @JsonIgnoreProperties("invoices")
    private Client client;
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    Collection<ServiceEntity> services;

    public Invoice() {
    }

    public Invoice(BigInteger number,
                   String remarks,
                   String paymentStatus,
                   Integer discount,
                   Client client,
                   Collection<ServiceEntity> services) {
        this.number = number;
        this.remarks = remarks;
        this.paymentStatus = paymentStatus;
        this.discount = discount;
        this.client = client;
        this.services = services;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigInteger getNumber() {
        return number;
    }

    public void setNumber(BigInteger number) {
        this.number = number;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public Double getSubTotal() {
        Double total = 0.0;

        for(ServiceEntity service: this.getServices()) {
            total += service.getPrice();
        }

        return total;
    }

    public void setSubTotal(Double subTotal) {
        this.subTotal = subTotal;
    }

    public Integer getDiscount() {
        return discount;
    }

    public void setDiscount(Integer discount) {
        this.discount = discount;
    }

    public Double getGrandTotal() {
        double grandTotal = this.getSubTotal() + this.getSubTotal() * 0.1;

        if(this.getDiscount() != null) {
            grandTotal -= (this.discount * 0.01 * this.getSubTotal());
        }

        return grandTotal;
    }

    public void setGrandTotal(Double grandTotal) {
        this.grandTotal = grandTotal;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Collection<ServiceEntity> getServices() {
        return services;
    }

    public void setServices(Collection<ServiceEntity> services) {
        this.services = services;
    }
}
