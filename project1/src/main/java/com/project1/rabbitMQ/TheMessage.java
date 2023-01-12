package com.project1.rabbitMQ;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import java.sql.Timestamp;

@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "@id", scope = TheMessage.class)
public class TheMessage {

    private Timestamp timestamp;
    private Double consumption;
    private int deviceId;

    public TheMessage(Timestamp timestamp, Double consumption, int deviceId) {
        this.timestamp = timestamp;
        this.consumption = consumption;
        this.deviceId = deviceId;
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

    public int getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(int deviceId) {
        this.deviceId = deviceId;
    }

    @Override
    public String toString(){
        return "The Message: [deviceId=" + deviceId +", consumption=" + consumption + ", timestamp=" + timestamp +"]";
    }
}
