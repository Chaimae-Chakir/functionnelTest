package com.adleadmedia.localion_voiture.accountmanagement.services;

  import com.adleadmedia.localion_voiture.accountmanagement.repositories.UserRepo;
  import org.springframework.beans.factory.annotation.Autowired;
  import org.springframework.security.crypto.password.PasswordEncoder;
  import org.springframework.stereotype.Service;
  import com.adleadmedia.localion_voiture.accountmanagement.models.AppUser;

  import java.util.List;


@Service
public class UserService {

    private UserRepo userRepo;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepo utilisateurRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = utilisateurRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public AppUser addNewUser(AppUser user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    public AppUser loadUserByUsername(String username) {
        return userRepo.findByUsername(username);
    }

    public List<AppUser> listUsers() {
        return userRepo.findAll();
    }

    public AppUser edit(AppUser user) {
        return this.addNewUser(user);
    }

}
