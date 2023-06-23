package com.adleadmedia.localion_voiture;


import com.adleadmedia.localion_voiture.accountmanagement.dto.AffectRoleToUserDto;
import com.adleadmedia.localion_voiture.accountmanagement.models.AppRole;
import com.adleadmedia.localion_voiture.accountmanagement.models.AppUser;
import com.adleadmedia.localion_voiture.accountmanagement.repositories.RoleRepo;
import com.adleadmedia.localion_voiture.accountmanagement.repositories.UserRepo;
import com.adleadmedia.localion_voiture.accountmanagement.services.AccountServiceImpl;
import com.adleadmedia.localion_voiture.accountmanagement.services.AppRoleService;
import com.adleadmedia.localion_voiture.accountmanagement.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import springfox.documentation.builders.RequestHandlerSelectors;

import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;
@Component
@EnableWebMvc
@SpringBootApplication
@EnableSwagger2
@CrossOrigin("*")
public class LocalionVoitureApplication{
	@Autowired
	RoleRepo RoleRepository;
	@Autowired
	UserRepo UserRepository;
	@Lazy
	@Autowired
	AccountServiceImpl accountServiceImpl;
	@Lazy
	@Autowired
	UserService adminuser;

	private UserService userService;

	public static void main(String[] args) {
		SpringApplication.run(LocalionVoitureApplication.class, args);
	}
	
	
	@Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
	
	@Bean
	public Docket productApi() {
	      return new Docket(DocumentationType.SWAGGER_2).select()
	         .apis(RequestHandlerSelectors.basePackage("com.adleadmedia.localion_voiture")).build();
	   }

	

	
}
