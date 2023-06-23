package com.adleadmedia.localion_voiture.accountmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.adleadmedia.localion_voiture.accountmanagement.models.Reservation;


public interface ReservationRepo extends JpaRepository<Reservation, String> {
   Reservation findBynumReservation(String numR);
}
