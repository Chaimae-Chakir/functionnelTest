package com.adleadmedia.localion_voiture.accountmanagement.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.hibernate.annotations.GenericGenerator;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="reservations")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Reservation {
	
	@Id
	@GenericGenerator(name="reservation_id",strategy="com.adleadmedia.localion_voiture.accountmanagement.models.generators.ReservationGenerator")
	@GeneratedValue(generator = "reservation_id")
	private String numReservation;
	
	private Date dateDebut;
	private Date dateFin;
	private String etatReservation;
	private String heureDebut;
	private String heureFin;
	
	@Column(length = 50)
	private String lieuPrise;
	
	@Column(length = 50)
	private String lieuRetour;
	
	private int totalTTC;
	
	
	@ManyToOne @JsonIgnoreProperties("reservation") @Cascade(CascadeType.MERGE)
	@JoinColumn(name="client_id",referencedColumnName ="idClient")
	 private Client client;
	
	@ManyToOne @JsonIgnoreProperties("reservation") @Cascade(CascadeType.MERGE)
	@JoinColumn(name="voiture_id",referencedColumnName ="idVoiture")
    private Voiture voiture;
	
	@OneToOne(mappedBy = "reservation") @JsonIgnoreProperties("reservations")
	@JsonIgnore
	private Devis devis;
	
	@OneToOne(mappedBy = "reservation") @JsonIgnoreProperties("reservation")
	@JsonIgnore
	private Contrat contrat;
	
	

}
