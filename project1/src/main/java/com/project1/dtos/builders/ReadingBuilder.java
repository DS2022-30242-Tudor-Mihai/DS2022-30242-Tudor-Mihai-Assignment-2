package com.project1.dtos.builders;

import com.project1.dtos.validators.ReadingDTO;
import com.project1.entities.Reading;

public class ReadingBuilder {

    public ReadingBuilder() {
    }

    public static ReadingDTO toReadingDTO(Reading reading) {
        return new ReadingDTO(reading.getId(), reading.getTimestamp(), reading.getConsumption());
    }

    public static Reading toEntity(ReadingDTO readingDTO) {
        return new Reading(readingDTO.getId(), readingDTO.getTimestamp(), readingDTO.getConsumption());
    }
}
