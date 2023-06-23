package com.adleadmedia.localion_voiture.accountmanagement.services;

import java.util.List;

import com.adleadmedia.localion_voiture.accountmanagement.models.Client;


public interface ClientService {
    Client creer(Client client);
	
	List<Client > lire();
	
	Client getById(int id);
	
	Client  modifier(int id,Client client);
	
    void supprimer(int id);
}
