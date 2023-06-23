package com.adleadmedia.localion_voiture.accountmanagement.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adleadmedia.localion_voiture.accountmanagement.models.Reservation;
import com.adleadmedia.localion_voiture.accountmanagement.services.ReservationService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/reservations")
@AllArgsConstructor
public class ReservationContoller {
	
	private final ReservationService reservationService;
	
	@GetMapping("/afficher")
	public List<Reservation> afficherAll(){
		return reservationService.lire();
	}
	
	@PostMapping("/create")
	public Reservation ajouterReservation(@RequestBody Reservation reservation) {
		return reservationService.creer(reservation);
	}
	
	@PutMapping("/modifier/{id}")
	public Reservation modiffierReservation(@PathVariable String id,@RequestBody Reservation reservation) {
		return reservationService.modifier(id, reservation);
	}
	
	@DeleteMapping("supprimer/{id}")
	public void supprimerReservation(@PathVariable String id) {
		reservationService.supprimer(id);
	}

}
