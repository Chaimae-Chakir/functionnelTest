package com.adleadmedia.localion_voiture.accountmanagement.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.adleadmedia.localion_voiture.accountmanagement.models.Reservation;
import com.adleadmedia.localion_voiture.accountmanagement.repositories.ReservationRepo;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ReservationServiceImp implements ReservationService {

	private final ReservationRepo reservationRepo;
	
	@Override
	public Reservation creer(Reservation reservation) {
		
		return this.reservationRepo.save(reservation);
	}

	@Override
	public List<Reservation> lire() {
		return this.reservationRepo.findAll();
	}

	@Override
	public Reservation getById(String id) {
		return this.reservationRepo.findById(id).get();
	}

	@Override
	public Reservation modifier(String id, Reservation reservation) {
		return reservationRepo.findById(id).map(rv ->{
			rv.setDateDebut(reservation.getDateDebut());
			rv.setDateFin(reservation.getDateFin());
			rv.setEtatReservation(reservation.getEtatReservation());
			rv.setHeureDebut(reservation.getHeureDebut());
			rv.setHeureFin(reservation.getHeureFin());
			rv.setLieuPrise(reservation.getLieuPrise());
			rv.setLieuRetour(reservation.getLieuRetour());
			rv.setClient(reservation.getClient());
			
				return reservationRepo.save(rv);
				
			}).orElseThrow(()-> new RuntimeException("reservation nom trouve"));
	}

	@Override
	public void supprimer(String id) {
		reservationRepo.deleteById(id);
		
	}

}
