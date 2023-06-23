package com.adleadmedia.localion_voiture.accountmanagement.services;

import com.adleadmedia.localion_voiture.accountmanagement.models.AppRole;
import com.adleadmedia.localion_voiture.accountmanagement.models.AppUser;
import com.adleadmedia.localion_voiture.accountmanagement.repositories.RoleRepo;
import com.adleadmedia.localion_voiture.accountmanagement.repositories.UserRepo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



@Service
@Transactional
public class AccountServiceImpl {

    private RoleRepo roleRepo;
    private UserRepo utilisateurRepo;

    @Autowired
    public AccountServiceImpl(RoleRepo roleRepo, UserRepo utilisateurRepo, PasswordEncoder passwordEncoder){
        this.roleRepo = roleRepo;
        this.utilisateurRepo = utilisateurRepo;
    }

    public void affectRoleToUser(String username, String role)
    {  
        AppUser user = utilisateurRepo.findByUsername(username);
        AppRole role1 = roleRepo.findByLibelle(role);
        user.setRoles(role1);
        utilisateurRepo.save(user);
    }

    public void delete(AppUser user) {
        this.utilisateurRepo.delete(user);
    }

}
