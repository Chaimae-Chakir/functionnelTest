package com.adleadmedia.localion_voiture.accountmanagement.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.hibernate.annotations.GenericGenerator;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="contrats")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Contrat {
	@Id
    @GenericGenerator(name="contrat_id",strategy="com.adleadmedia.localion_voiture.accountmanagement.models.generators.ContratGenerator")
	@GeneratedValue(generator = "contrat_id")
	private String idContrat;
    @Column(length = 50)
	private String registraction;
    @OneToOne 
    @JoinColumn(name="reservation_id",referencedColumnName = "numReservation") @Cascade(CascadeType.MERGE)
    private Reservation reservation;
	
}
