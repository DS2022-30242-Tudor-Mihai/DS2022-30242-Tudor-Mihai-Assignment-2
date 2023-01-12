package com.project1.entities;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

@Entity
@Table(name = "reading")
public class Reading implements Serializable {
    private static final long serialVersionUID = -3848027720111519532L;

    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    private Integer id;

    @Column(name = "timestamp", nullable = false)
    private Timestamp timestamp;

    @Column(name="consumption", nullable = false)
    private Double consumption;

    @ManyToOne
    private Device device;

    public Reading() {
    }

    public Reading(Integer id, Timestamp timestamp, Double consumption) {
        this.timestamp = timestamp;
        this.consumption = consumption;
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }


    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public Double getConsumption() {
        return consumption;
    }

    public void setConsumption(Double consumption) {
        this.consumption = consumption;
    }

    public Device getDevice() {
        return device;
    }

    public void setDevice(Device device) {
        this.device = device;
    }
}
