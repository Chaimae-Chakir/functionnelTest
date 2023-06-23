package com.adleadmedia.localion_voiture.accountmanagement.models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
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
@Table(name="devis")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Devis {
	

	@Id
	@GenericGenerator(name="devis_id",strategy="com.adleadmedia.localion_voiture.accountmanagement.models.generators.DevisGenerator")
	@GeneratedValue(generator = "devis_id")
	private String id;
	
	private String affaire;
	private String etatDevis;
	private String conditionPayement;
	private String regelement;
	private String delaiV;
	private Date dateCreation;
	private int qtes;
	private double tva;
	
	@OneToOne @JsonIgnoreProperties("devis")
	@JoinColumn(name="reservation_id",referencedColumnName = "numReservation") @Cascade(CascadeType.MERGE)
	private Reservation reservation;
	
	@OneToOne(mappedBy = "devis")  @JsonIgnoreProperties("devis")
	@JsonIgnore
	private Facture facture;
	
	@OneToOne(mappedBy = "devis")  @JsonIgnoreProperties("devis")
	@JsonIgnore
	private Avoir avoir;

}
