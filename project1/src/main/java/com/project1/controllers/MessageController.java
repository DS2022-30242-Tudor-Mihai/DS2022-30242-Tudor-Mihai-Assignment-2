package com.project1.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MessageController {

    @Autowired
    SimpMessagingTemplate template;

    @PostMapping("/send")
    public ResponseEntity<String> sendMessage(String message ){
        template.convertAndSend("/message/readValue", message);
        return new ResponseEntity<>("Send", HttpStatus.OK);
    }

    @SendTo("/message/readValue")
    public String broadCastMessage(@Payload String message){
        return message;
    }
}
