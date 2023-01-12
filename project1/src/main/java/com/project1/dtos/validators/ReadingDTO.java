package com.project1.dtos.validators;

import org.springframework.hateoas.RepresentationModel;

import java.sql.Timestamp;
import java.util.Objects;

public class ReadingDTO extends RepresentationModel<ReadingDTO> {

    private Integer id;
    private Timestamp timestamp;
    private Double consumption;

    public ReadingDTO() {
    }

    public ReadingDTO(Timestamp timestamp, Double consumption){
        this.consumption = consumption;
        this.timestamp = timestamp;
    }

    public ReadingDTO(Integer id, Timestamp timestamp, Double consumption) {
        this.id = id;
        this.timestamp = timestamp;
        this.consumption = consumption;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ReadingDTO)) return false;
        ReadingDTO that = (ReadingDTO) o;
        return Objects.equals(id, that.id) && Objects.equals(timestamp, that.timestamp) && Objects.equals(consumption, that.consumption);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, timestamp, consumption);
    }
}
