package com.ssafy.haeruhand;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class HaeruhandApplication {

	public static void main(String[] args) {
		SpringApplication.run(HaeruhandApplication.class, args);
	}

}
