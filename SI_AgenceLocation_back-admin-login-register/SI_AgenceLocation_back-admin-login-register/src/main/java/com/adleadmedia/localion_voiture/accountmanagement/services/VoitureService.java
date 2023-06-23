package com.adleadmedia.localion_voiture.accountmanagement.services;

import java.util.List;

import com.adleadmedia.localion_voiture.accountmanagement.models.Voiture;


public interface VoitureService {

    Voiture ajouter(Voiture newvoiture);
	
	List<Voiture > lire();
	
	Voiture getById(int id);
	
	Voiture  modifier(int id,Voiture  newvoiture);
	
    void supprimer(int id);
    
    Voiture getByNom(String nom);
}
