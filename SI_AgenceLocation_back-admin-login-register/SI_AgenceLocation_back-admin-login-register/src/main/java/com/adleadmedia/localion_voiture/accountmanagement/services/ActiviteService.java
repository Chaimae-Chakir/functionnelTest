package com.adleadmedia.localion_voiture.accountmanagement.services;

import java.util.List;

import com.adleadmedia.localion_voiture.accountmanagement.models.ActiviteLog;

public interface ActiviteService {

    ActiviteLog creer(ActiviteLog actvLog);
	
	List<ActiviteLog> lire();
	
	ActiviteLog getById(int id);
	
	ActiviteLog modifier(int id,ActiviteLog actvLog);
	
    void supprimer(int id);
}
