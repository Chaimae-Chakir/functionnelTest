package com.adleadmedia.localion_voiture.accountmanagement.controller;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adleadmedia.localion_voiture.accountmanagement.models.AppUser;
import com.adleadmedia.localion_voiture.accountmanagement.services.UserService;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@EnableWebMvc
@RestController
@RequestMapping("api/users")
public class UserController {
	
	private UserService utilisateurService;
	
	@Autowired
    public UserController(UserService utilisateurService){
        this.utilisateurService = utilisateurService;
    }
	
	@GetMapping("/")
    @PostAuthorize("hasAnyAuthority('ADMIN')")
    public List<AppUser> listUsers(){
        return utilisateurService.listUsers();
    }
	
	@GetMapping("/{username}")
    @PostAuthorize("hasAnyAuthority('ADMIN')")
    public AppUser getUserByUsername(@PathVariable String username){
        return this.utilisateurService.loadUserByUsername(username);
    }

}
