package com.adleadmedia.localion_voiture.accountmanagement.security;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.adleadmedia.localion_voiture.accountmanagement.models.AppUser;
import com.adleadmedia.localion_voiture.accountmanagement.services.UserService;

import java.util.ArrayList;
import java.util.Collection;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    public UserService utilisateurService;

    @Autowired
    public UserDetailsServiceImpl(UserService utilisateurService){
        this.utilisateurService = utilisateurService;
    }


    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser user = utilisateurService.loadUserByUsername(username);
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        user.getRoles();
        return new User(user.getUsername(), user.getPassword(), authorities);
    }
}
