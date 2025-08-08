package com.ssafy.haeruhand;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@EnableScheduling
@EnableJpaAuditing
@ConfigurationPropertiesScan("com.ssafy.haeruhand")
public class HaeruhandApplication {

	public static void main(String[] args) {
		SpringApplication.run(HaeruhandApplication.class, args);
	}

}
