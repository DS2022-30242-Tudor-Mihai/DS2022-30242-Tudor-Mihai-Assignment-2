package com.project1.dtos.validators;

import org.springframework.hateoas.RepresentationModel;

import java.util.Objects;

public class DeviceDTO extends RepresentationModel<DeviceDTO> {
    private Integer id;
    private String description;
    private String address;
    private Double max_h_consumption;

    public DeviceDTO() {

    }

    public DeviceDTO(Integer id, String description, String address, Double max_h_consumption) {
        this.id = id;
        this.description = description;
        this.address = address;
        this.max_h_consumption = max_h_consumption;
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof DeviceDTO)) return false;
        DeviceDTO that = (DeviceDTO) o;
        return Objects.equals(id, that.id) && Objects.equals(description, that.description) && Objects.equals(address, that.address) && Objects.equals(max_h_consumption, that.max_h_consumption);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, description, address, max_h_consumption);
    }
}
