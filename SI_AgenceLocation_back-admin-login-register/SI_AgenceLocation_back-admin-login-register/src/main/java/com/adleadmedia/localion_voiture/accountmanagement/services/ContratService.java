package com.adleadmedia.localion_voiture.accountmanagement.services;

import java.util.List;

import com.adleadmedia.localion_voiture.accountmanagement.models.Contrat;


public interface ContratService {

   Contrat creer(Contrat contrat);
	
	List<Contrat > lire();
	
	Contrat getById(String id);
	
	Contrat modifier(String id,Contrat contrat);
	
    void supprimer(String id);
}
