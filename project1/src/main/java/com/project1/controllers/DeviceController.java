package com.project1.controllers;

import com.project1.dtos.builders.DeviceBuilder;
import com.project1.dtos.builders.ReadingBuilder;
import com.project1.dtos.validators.DeviceDTO;
import com.project1.dtos.validators.ReadingDTO;
import com.project1.entities.Device;
import com.project1.entities.Reading;
import com.project1.services.DeviceService;
import com.project1.services.UserService;
import org.springframework.hateoas.Link;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = "/device")
public class DeviceController {
    private final DeviceService deviceService;

    public DeviceController(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    @GetMapping()
    public ResponseEntity<?> getDevices() {
        List<Device> devices = deviceService.getDevices();
        List<DeviceDTO> deviceDTOS = devices.stream().map(DeviceBuilder::toDeviceDTO).collect(Collectors.toList());
        for (DeviceDTO dto : deviceDTOS) {
            Link deviceLink = linkTo(methodOn(DeviceController.class)
                    .getDevices()).withRel("deviceDetails");
            dto.add(deviceLink);
        }
        return new ResponseEntity<>(deviceDTOS, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<?> insertDevice(@RequestBody DeviceDTO deviceDTO) {
        Device device = deviceService.insert(deviceDTO);
        return new ResponseEntity<>(DeviceBuilder.toDeviceDTO(device), HttpStatus.CREATED);
    }

    @PutMapping()
    public ResponseEntity<?> editDevice(@Valid @RequestBody DeviceDTO deviceDTO) {
        Device device = deviceService.update(deviceDTO);
        return new ResponseEntity<>(DeviceBuilder.toDeviceDTO(device), HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> deleteDevice(@PathVariable("id") Integer id) {
        deviceService.delete(id);
        return new ResponseEntity<>("Worked", HttpStatus.ACCEPTED);
    }

    @GetMapping(value = "/findAllByUseranme/{username}")
    public ResponseEntity<?> getDevicesByUsersUsername(@PathVariable("username") String username){
        List<Device> devices = deviceService.getDevicesByUsersUsername(username);
        List<DeviceDTO> deviceDTOS = devices.stream().map(DeviceBuilder::toDeviceDTO).collect(Collectors.toList());
        for (DeviceDTO dto : deviceDTOS) {
            Link deviceLink = linkTo(methodOn(DeviceController.class)
                    .getDevices()).withRel("deviceDetails");
            dto.add(deviceLink);
        }
        return new ResponseEntity<>(deviceDTOS, HttpStatus.OK);
    }

    @PutMapping(value = "/{deviceId}/{readingId}")
    public ResponseEntity<?> addReading(@PathVariable("deviceId") Integer deviceId, @PathVariable("readingId") Integer readingId){
        Device device = deviceService.addReading(deviceId, readingId);
        return new ResponseEntity<>(DeviceBuilder.toDeviceDTO(device), HttpStatus.OK);
    }

    @GetMapping(value = "/find/{id}")
    public ResponseEntity<?> getDeviceById(@PathVariable("id") Integer id){
        Device device = deviceService.getDeviceById(id);
        return new ResponseEntity<>(DeviceBuilder.toDeviceDTO(device), HttpStatus.OK);
    }

    @GetMapping(value = "/findReadings/{deviceId}/{date}")
    public ResponseEntity<?> getReadingsByDeviceIdDate(@PathVariable("deviceId") Integer userId, @PathVariable("date") String date){
        List<Reading> readings = deviceService.getReadingsForDevice(userId, date);
        List<ReadingDTO> readingDTOS = readings.stream().map(ReadingBuilder::toReadingDTO).collect(Collectors.toList());
        return new ResponseEntity<>(readingDTOS, HttpStatus.OK);
    }
}
