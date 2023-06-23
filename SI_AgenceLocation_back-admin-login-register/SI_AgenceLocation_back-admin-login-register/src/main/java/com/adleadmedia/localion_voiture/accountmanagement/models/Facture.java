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

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="factures")
public class Facture {
	@Id
	@GenericGenerator(name="facture_id",strategy="com.adleadmedia.localion_voiture.accountmanagement.models.generators.FactureGenerator")
	@GeneratedValue(generator = "facture_id")
	private String id;
	private String type;
	private String etat;
	private double totalPaye;
	private double totalRest;
	private Date dateCreation;
	private String validite;
	private double remise;
	
	@OneToOne @JsonIgnoreProperties("facture")
	@JoinColumn(name="devis_id",referencedColumnName = "id") @Cascade(CascadeType.MERGE)
	private Devis devis;
}
