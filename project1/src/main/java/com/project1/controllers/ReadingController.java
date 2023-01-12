package com.project1.controllers;

import com.project1.dtos.builders.ReadingBuilder;
import com.project1.dtos.builders.UserBuilder;
import com.project1.dtos.validators.ReadingDTO;
import com.project1.dtos.validators.UserDTO;
import com.project1.entities.Reading;
import com.project1.entities.Users;
import com.project1.services.ReadingService;
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
@RequestMapping("/reading")
public class ReadingController {
    private final ReadingService readingService;

    public ReadingController(ReadingService readingService) {
        this.readingService = readingService;
    }

    @GetMapping()
    public ResponseEntity<?> getReadings() {
        List<Reading> readings = readingService.getReadings();
        List<ReadingDTO> readingDTOS = readings.stream().map(ReadingBuilder::toReadingDTO).collect(Collectors.toList());
        for (ReadingDTO dto : readingDTOS) {
            Link readingLink = linkTo(methodOn(ReadingController.class)
                    .getReadings()).withRel("deviceDetails");
            dto.add(readingLink);
        }
        return new ResponseEntity<>(readingDTOS, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<?> insertReading(@Valid @RequestBody ReadingDTO readingDTO) {
        Reading reading = readingService.insert(readingDTO);
        return new ResponseEntity<>(ReadingBuilder.toReadingDTO(reading), HttpStatus.CREATED);
    }

    @PutMapping()
    public ResponseEntity<?> editReading(@Valid @RequestBody ReadingDTO readingDTO) {
        Reading reading = readingService.update(readingDTO);
        return new ResponseEntity<>(ReadingBuilder.toReadingDTO(reading), HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> deleteReading(@PathVariable("id") Integer id) {
        readingService.delete(id);
        return new ResponseEntity<>("Worked", HttpStatus.ACCEPTED);
    }

    @GetMapping(value = "/findAllByDeviceId/{id}")
    public ResponseEntity<?> getReadingsByDeviceId(@PathVariable("id") Integer id){
        List<Reading> readings = readingService.getReadingsByDeviceId(id);
        List<ReadingDTO> readingDTOS = readings.stream().map(ReadingBuilder::toReadingDTO).collect(Collectors.toList());
        for (ReadingDTO dto : readingDTOS) {
            Link readingLink = linkTo(methodOn(ReadingController.class)
                    .getReadings()).withRel("deviceDetails");
            dto.add(readingLink);
        }
        return new ResponseEntity<>(readingDTOS, HttpStatus.OK);
    }
}
