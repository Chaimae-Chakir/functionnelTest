package com.adleadmedia.localion_voiture.accountmanagement.services;

import java.util.List;

import com.adleadmedia.localion_voiture.accountmanagement.models.Gamme;


public interface GammeService {

	Gamme creer(Gamme gamme);
	
	List<Gamme > lire();
	
	Gamme getById(int id);
	
	Gamme  modifier(int id,Gamme gamme);
	
    void supprimer(int id);
}
