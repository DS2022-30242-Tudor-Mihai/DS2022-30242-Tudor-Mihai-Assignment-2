package com.project1.entities;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "device")
public class Device implements Serializable {
    private static final long serialVersionUID = 8677410554712676990L;

    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    private Integer id;

    @ManyToOne
    private Users users;

    @Column(name = "description")
    private String description;

    @Column(name = "address")
    private String address;

    @Column(name = "max_h_consumption")
    private Double max_h_consumption;

    @OneToMany(mappedBy = "device", orphanRemoval = true)
    private List<Reading> readings;

    public Device() {
    }

    public Device(Integer id, String description, String address, Double max_h_consumption) {
        this.id = id;
        this.description = description;
        this.address = address;
        this.max_h_consumption = max_h_consumption;
        this.readings = new ArrayList<>();
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Double getMax_h_consumption() {
        return max_h_consumption;
    }

    public void setMax_h_consumption(Double max_h_consumption) {
        this.max_h_consumption = max_h_consumption;
    }

    public List<Reading> getReadings() {
        return readings;
    }

    public void setReadings(List<Reading> readings) {
        this.readings = readings;
    }

    public void addReading(Reading reading){
        this.readings.add(reading);
    }
}
