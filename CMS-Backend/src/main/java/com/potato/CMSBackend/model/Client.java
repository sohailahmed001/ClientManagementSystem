package com.potato.CMSBackend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;

@Entity
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String firstName;
    private String lastName;
    private Date dob;
    private String primaryContact;
    private String alternateContact;
    private String address;
    private String email;
    private Boolean isActive;
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "username")
    private User user;
    @OneToMany(mappedBy = "client")
    @JsonIgnoreProperties("client")
    Collection<Invoice> invoices;

    public Client() {
    }

    public Client(String firstName,
                  String lastName,
                  Date dob,
                  String primaryContact,
                  String alternateContact,
                  String address,
                  String email,
                  Boolean isActive,
                  User user,
                  Collection<Invoice> invoices) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.primaryContact = primaryContact;
        this.alternateContact = alternateContact;
        this.address = address;
        this.email = email;
        this.isActive = isActive;
        this.user = user;
        this.invoices = invoices;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getPrimaryContact() {
        return primaryContact;
    }

    public void setPrimaryContact(String primaryContact) {
        this.primaryContact = primaryContact;
    }

    public String getAlternateContact() {
        return alternateContact;
    }

    public void setAlternateContact(String alternateContact) {
        this.alternateContact = alternateContact;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Collection<Invoice> getInvoices() {
        return invoices;
    }

    public void setInvoices(Collection<Invoice> invoices) {
        this.invoices = invoices;
    }
}
