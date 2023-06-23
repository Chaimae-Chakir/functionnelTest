package com.adleadmedia.localion_voiture.accountmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.adleadmedia.localion_voiture.accountmanagement.models.Voiture;



public interface VoitureRepo extends JpaRepository<Voiture, Integer> {
	Voiture findByidVoiture(int idVoiture);
	Voiture findBynom(String nom);
}
