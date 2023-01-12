package com.project1.dtos.builders;

import com.project1.dtos.validators.DeviceDTO;
import com.project1.entities.Device;

public class DeviceBuilder {

    public DeviceBuilder() {
    }

    public static DeviceDTO toDeviceDTO(Device device) {
        return new DeviceDTO(device.getId(), device.getDescription(), device.getAddress(),
                device.getMax_h_consumption());
    }

    public static Device toEntity(DeviceDTO deviceDTO) {
        return new Device(deviceDTO.getId(), deviceDTO.getDescription(), deviceDTO.getAddress(),
                deviceDTO.getMax_h_consumption());
    }
}
