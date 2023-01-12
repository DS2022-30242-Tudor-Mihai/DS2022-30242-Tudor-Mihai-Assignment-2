package com.project1.rabbitMQ;

import com.project1.dtos.validators.ReadingDTO;
import com.project1.entities.Reading;
import com.project1.services.DeviceService;
import com.project1.services.ReadingService;
import lombok.SneakyThrows;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

@Component
public class Consumer implements MessageListener {

    private ReadingService readingService;
    private DeviceService deviceService;
    private SimpMessagingTemplate simpMessagingTemplate;

    public Consumer(ReadingService readingService, DeviceService deviceService, SimpMessagingTemplate simpMessagingTemplate) {
        this.readingService = readingService;
        this.deviceService = deviceService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @Override
    public void onMessage(Message message) {
        String theMessage = new String(message.getBody());
        String t = theMessage.split(",")[0];
        String i = theMessage.split(",")[1];
        String c = theMessage.split(",")[2];

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        try{
            Date parsedDate = dateFormat.parse(t);
            Timestamp timestamp = new java.sql.Timestamp(parsedDate.getTime());
            TheMessage reading = new TheMessage(timestamp, Double.parseDouble(c), Integer.parseInt(i));

            ReadingDTO readingDTO = new ReadingDTO(timestamp, Double.parseDouble(c));
            Reading reading1 = readingService.insert(readingDTO);
            deviceService.addReading(Integer.parseInt(i), reading1.getId());
        }catch (Exception e) {
            System.out.println(e.getMessage());
        }

        simpMessagingTemplate.convertAndSend("/topic/message", new String(message.getBody()));
    }
}
