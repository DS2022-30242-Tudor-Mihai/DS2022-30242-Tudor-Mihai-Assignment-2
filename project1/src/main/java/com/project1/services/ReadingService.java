package com.project1.services;

import com.project1.dtos.builders.ReadingBuilder;
import com.project1.dtos.validators.ReadingDTO;
import com.project1.entities.Reading;
import com.project1.repositories.ReadingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ReadingService {
    private static final Logger LOGGER = LoggerFactory.getLogger(ReadingService.class);
    private final ReadingRepository readingRepository;

    public ReadingService(ReadingRepository readingRepository) {
        this.readingRepository = readingRepository;
    }

    @Transactional
    public List<Reading> getReadings() {
        return readingRepository.findAll();
    }

    @Transactional
    public Reading insert(ReadingDTO readingDTO) {
        Reading reading = ReadingBuilder.toEntity(readingDTO);
        reading = readingRepository.save(reading);
        LOGGER.debug("Reading with id {} was inserted in db", reading.getId());
        return reading;
    }

    @Transactional
    public void delete(Integer id) {
        Optional<Reading> reading = readingRepository.findById(id);
        if (reading.isPresent()) {
            LOGGER.debug("Reading with id {} is deleted from db", reading.get().getId());
            readingRepository.delete(reading.get());
        }
    }

    @Transactional
    public Reading update(ReadingDTO readingDTO) {
        Optional<Reading> reading = readingRepository.findById(readingDTO.getId());
        reading.get().setConsumption(readingDTO.getConsumption());
        reading.get().setTimestamp(readingDTO.getTimestamp());
        reading.ifPresent(readingRepository::save);
        return reading.get();
    }

    @Transactional
    public List<Reading> getReadingsByDeviceId(Integer id) {
        Optional<List<Reading>> reading = readingRepository.findReadingsByDevice_Id(id);
        return reading.get();
    }
}
