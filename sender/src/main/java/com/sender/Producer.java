package com.sender;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

import java.io.BufferedReader;
import java.io.FileReader;
import java.sql.Timestamp;
import java.time.Instant;

public class Producer {

    private static int device = 0;

    public static void send() throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("cow-01.rmq2.cloudamqp.com");
        factory.setUsername("mhucqorz");
        factory.setVirtualHost("mhucqorz");
        factory.setPassword("Wf7v8cLhkuobbltMy5uqjjBoYCO4aox0");
        factory.setPort(5672);

        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();
        channel.queueDeclare("the_queue", true, false, false, null);

        BufferedReader csv = new BufferedReader(new FileReader("src/sensor.csv"));
        String value = "";

        while ((value = csv.readLine()) != null) {
            int id = device % 2 == 0 ? 1 : 2;
            device++;

            String message = Timestamp.from(Instant.now()) + "," + id + "," + value;

            channel.basicPublish("", "the_queue", null, message.getBytes());
            System.out.println("Sent the message: " + message);
            Thread.sleep(2000);
        }
    }
}
