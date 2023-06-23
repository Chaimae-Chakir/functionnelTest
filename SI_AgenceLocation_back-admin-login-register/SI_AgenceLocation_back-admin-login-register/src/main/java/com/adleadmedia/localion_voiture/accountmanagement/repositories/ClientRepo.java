package com.adleadmedia.localion_voiture.accountmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.adleadmedia.localion_voiture.accountmanagement.models.Client;


public interface ClientRepo extends JpaRepository<Client, Integer>{

}
