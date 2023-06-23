package com.adleadmedia.localion_voiture.accountmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.adleadmedia.localion_voiture.accountmanagement.models.Devis;

public interface DevisRepo extends JpaRepository<Devis, String> {

}
