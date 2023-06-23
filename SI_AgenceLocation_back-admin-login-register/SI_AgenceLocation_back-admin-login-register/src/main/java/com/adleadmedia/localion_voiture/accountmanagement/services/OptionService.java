package com.adleadmedia.localion_voiture.accountmanagement.services;

import java.util.List;

import com.adleadmedia.localion_voiture.accountmanagement.models.Option;


public interface OptionService {

   Option creer(Option option);
	
	List<Option > lire();
	
	Option getById(int id);
	
	Option  modifier(int id,Option option);
	
    void supprimer(int id);
}
