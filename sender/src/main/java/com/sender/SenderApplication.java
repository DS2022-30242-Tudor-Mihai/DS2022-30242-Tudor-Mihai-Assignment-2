package com.sender;

import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SenderApplication {

	public static void main(String[] args) throws Exception {
		try{
			Producer.send();
		}catch (Exception e){
			System.out.println("The following exception has been thrown: " + e.getMessage());
		}
	}
}
