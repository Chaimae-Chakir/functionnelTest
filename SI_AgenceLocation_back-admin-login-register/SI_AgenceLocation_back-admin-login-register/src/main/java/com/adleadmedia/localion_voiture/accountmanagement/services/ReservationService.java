package com.adleadmedia.localion_voiture.accountmanagement.services;

import java.util.List;

import com.adleadmedia.localion_voiture.accountmanagement.models.Reservation;
   

public interface ReservationService {
    Reservation creer(Reservation reservation);
	
	List<Reservation> lire();
	
	 Reservation getById(String id);
	
	 Reservation modifier(String id,Reservation reservation);
	
    void supprimer(String id);
}
