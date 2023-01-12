package com.project1.repositories;

import com.project1.entities.Device;
import com.project1.entities.Reading;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

public interface ReadingRepository extends JpaRepository<Reading, Integer> {
    Optional<List<Reading>> findReadingsByDevice_Id(Integer id);
    List<Reading> findReadingsByDeviceAndTimestampBetween(Device device, Timestamp start, Timestamp end);
}
