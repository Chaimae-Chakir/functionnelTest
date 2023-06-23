package com.adleadmedia.localion_voiture.accountmanagement.repositories;


import com.adleadmedia.localion_voiture.accountmanagement.models.AppRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface RoleRepo extends JpaRepository<AppRole, String> {

    AppRole findByLibelle(String libelle); 
    
}
