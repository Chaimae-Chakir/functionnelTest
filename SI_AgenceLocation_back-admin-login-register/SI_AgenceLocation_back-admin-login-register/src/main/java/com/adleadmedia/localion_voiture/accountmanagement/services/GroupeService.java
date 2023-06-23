package com.adleadmedia.localion_voiture.accountmanagement.services;

import java.util.List;

import com.adleadmedia.localion_voiture.accountmanagement.models.Groupe;



public interface GroupeService {
	Groupe creer(Groupe groupe);
		
		List<Groupe > lire();
		
		Groupe getById(int id);
		
		Groupe  modifier(int id,Groupe groupe);
		
	    void supprimer(int id);

}
