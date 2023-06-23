package com.adleadmedia.localion_voiture.accountmanagement.controller;

import com.adleadmedia.localion_voiture.accountmanagement.dto.AffectRoleToUserDto;
import com.adleadmedia.localion_voiture.accountmanagement.exception.MessageResponse;
import com.adleadmedia.localion_voiture.accountmanagement.models.ActiviteLog;
import com.adleadmedia.localion_voiture.accountmanagement.models.AppRole;
import com.adleadmedia.localion_voiture.accountmanagement.models.AppUser;
import com.adleadmedia.localion_voiture.accountmanagement.repositories.ActiviteRepo;
import com.adleadmedia.localion_voiture.accountmanagement.services.AccountServiceImpl;
import com.adleadmedia.localion_voiture.accountmanagement.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;


import java.security.Principal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@EnableWebMvc
@RestController
@RequestMapping("api/accounts")
public class AccountsController {

    private AccountServiceImpl accountService;
    private UserService utilisateurService;
    private ActiviteRepo activiteRepo;

    @Autowired
    public AccountsController(AccountServiceImpl accountService, UserService utilisateurService, ActiviteRepo activiteRepo){
        this.accountService = accountService;
        this.utilisateurService = utilisateurService;
        this.activiteRepo = activiteRepo;
    }

    @PostMapping("roletouser")
    @PostAuthorize("hasAnyAuthority('ADMIN')")
    public void affectRoleToUser(@RequestBody AffectRoleToUserDto affectRoleToUserDto){
        this.accountService.affectRoleToUser(affectRoleToUserDto.getUsername(), affectRoleToUserDto.getRole());
    }

    @GetMapping(path = "/profile")
    @PostAuthorize("hasAnyAuthority('ADMIN', 'ASSISTANT')")
    public AppUser profile(Principal principal){
        return utilisateurService.loadUserByUsername(principal.getName());
    }

    @PostMapping(path = "/register")
    public ResponseEntity<MessageResponse> create(@RequestBody AppUser user) throws Exception {

        if (this.utilisateurService.loadUserByUsername(user.getUsername()) != null) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }
        else {
            user = this.utilisateurService.addNewUser(user);
            this.accountService.affectRoleToUser(user.getUsername(), "ASSISTANT");
            
            // Create an activity for this user
            
            ActiviteLog activity = new ActiviteLog();
            activity.setUser(user);
            
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Date date = sdf.parse("1990-01-01");
            activity.setDateSingUp(date);
            
            activiteRepo.save(activity);
            return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
        }
    }

    @DeleteMapping(path = "/delete/{username}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public AppUser delete(@PathVariable(name = "username") String username) {
        AppUser user = this.utilisateurService.loadUserByUsername(username);
        if(user!=null)
            this.accountService.delete(user);
        return user;
    }

    @PatchMapping(path = "/modify")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('ASSISTANT')")
    public AppUser modify(@RequestBody AppUser user, Principal principal) {
        if(utilisateurService.loadUserByUsername(principal.getName()).getUsername().equals(user.getUsername()) ||
                utilisateurService.loadUserByUsername(principal.getName()).getRoles().equals(new AppRole("ADMIN")))
            return this.utilisateurService.edit(user);
        return null;
    }

}
