package com.project1.repositories;

import com.project1.entities.Device;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DeviceRepository extends JpaRepository<Device, Integer> {
    Optional<List<Device>> findDevicesByUsers_Username(String username);
}
