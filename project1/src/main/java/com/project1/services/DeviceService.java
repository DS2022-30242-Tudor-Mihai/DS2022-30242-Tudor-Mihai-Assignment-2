package com.project1.services;

import com.project1.dtos.builders.DeviceBuilder;
import com.project1.dtos.validators.DeviceDTO;
import com.project1.entities.Device;
import com.project1.entities.Reading;
import com.project1.repositories.DeviceRepository;
import com.project1.repositories.ReadingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class  DeviceService {
    private static final Logger LOGGER = LoggerFactory.getLogger(DeviceService.class);
    private final DeviceRepository deviceRepository;
    private final ReadingRepository readingRepository;

    @Autowired
    public DeviceService(DeviceRepository deviceRepository, ReadingRepository readingRepository) {
        this.deviceRepository = deviceRepository;
        this.readingRepository = readingRepository;
    }

    @Transactional
    public List<Device> getDevices() {
        return deviceRepository.findAll();
    }

    @Transactional
    public Device insert(DeviceDTO deviceDTO) {
        Device device = DeviceBuilder.toEntity(deviceDTO);
        device = deviceRepository.save(device);
        LOGGER.debug("Device with id {} was inserted in db", device.getId());
        return device;
    }

    @Transactional
    public Device update(DeviceDTO deviceDTO) {
        Optional<Device> device = deviceRepository.findById(deviceDTO.getId());
        device.get().setAddress(deviceDTO.getAddress());
        device.get().setDescription(deviceDTO.getDescription());
        device.get().setMax_h_consumption(deviceDTO.getMax_h_consumption());
        device.ifPresent(deviceRepository::save);
        return device.get();
    }

    @Transactional
    public void delete(Integer id) {
        Optional<Device> device = deviceRepository.findById(id);
        if (device.isPresent()) {
            LOGGER.debug("Device with id {} is deleted from db", device.get().getId());
            deviceRepository.delete(device.get());
        }
    }

    @Transactional
    public List<Device> getDevicesByUsersUsername(String username){
        Optional<List<Device>> devices = deviceRepository.findDevicesByUsers_Username(username);
        return devices.get();
    }

    @Transactional
    public Device getDeviceById(Integer id){
        Optional<Device> device = deviceRepository.findById(id);
        return device.get();
    }

    @Transactional
    public Device addReading(Integer deviceId, Integer readingId) {
        Optional<Device> device = deviceRepository.findById(deviceId);
        Optional<Reading> reading = readingRepository.findById(readingId);

        if (device.isPresent() && reading.isPresent()){
            reading.get().setDevice(device.get());
            device.get().addReading(reading.get());
        }

        return device.get();
    }

    @Transactional
    public List<Reading> getReadingsForDevice(Integer deviceId, String date){
        List<Reading> readings = new ArrayList<>();
        date = date + " 00:00:00";
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
            Date parsedDate = dateFormat.parse(date);
            Timestamp timestamp = new java.sql.Timestamp(parsedDate.getTime());
            Device device = deviceRepository.getById(deviceId);
            LocalDateTime timestampAuxStart = timestamp.toLocalDateTime().withHour(0).withMinute(0).withSecond(0);
            LocalDateTime timestampAuxEnd = timestamp.toLocalDateTime().withHour(23).withMinute(59).withSecond(59);
            Timestamp timestampStart = Timestamp.valueOf(timestampAuxStart);
            Timestamp timestampEnd = Timestamp.valueOf(timestampAuxEnd);
            readings = readingRepository.findReadingsByDeviceAndTimestampBetween(device, timestampStart, timestampEnd);

            System.out.println("Reading ids before mapping:");
            for (Reading reading : readings) {
                System.out.println(reading.getId() + " " + reading.getTimestamp());
            }

            Map<Integer, Reading> readingsByHour = new HashMap<>();

            for (Reading reading : readings) {
                Calendar cal = Calendar.getInstance();
                cal.setTime(reading.getTimestamp());
                int hour = cal.get(Calendar.HOUR_OF_DAY);
                readingsByHour.put(hour,reading);
            }

            for (Integer hour: readingsByHour.keySet()){
                Reading current = readingsByHour.get(hour);
                for (Reading r : readings) {
                    if(r.getTimestamp().getHours() == hour){
                        if(r.getTimestamp().after(current.getTimestamp())){
                            readingsByHour.put(hour, r);
                        }
                    }
                }
            }
            readings = new ArrayList<>(readingsByHour.values());

            System.out.println("Reading ids after mapping:");
            for (Reading reading : readings) {
                System.out.println(reading.getId() + " " + reading.getTimestamp());
            }
        } catch (Exception e){
            System.out.println(e.getMessage());
        }
        return readings;
    }

}
