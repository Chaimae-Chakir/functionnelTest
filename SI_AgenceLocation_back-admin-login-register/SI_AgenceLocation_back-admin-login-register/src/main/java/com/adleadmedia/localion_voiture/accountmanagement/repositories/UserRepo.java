package com.adleadmedia.localion_voiture.accountmanagement.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.adleadmedia.localion_voiture.accountmanagement.models.AppUser;

@Repository
public interface UserRepo extends JpaRepository<AppUser, String> {

    AppUser findByUsername(String username);

}
