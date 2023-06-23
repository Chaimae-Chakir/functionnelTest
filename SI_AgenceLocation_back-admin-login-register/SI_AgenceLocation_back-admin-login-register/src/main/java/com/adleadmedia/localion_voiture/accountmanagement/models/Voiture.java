package com.adleadmedia.localion_voiture.accountmanagement.models;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="voitures")
public class Voiture {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idVoiture;
	
	private String nom;
	private String imageV;
	@Column(length = 20)
	private String couleur;
	
	@Column(length = 50)
	private String modele;
	
	@Column(length = 20)
	private String etat;
	private double prix;
	private int place;
	private int port;
	private int sacs;
	
	
	@Column(length = 50)
	private String fuelType;
	
	
	@ManyToOne @JsonIgnoreProperties("voiture") @Cascade(CascadeType.MERGE)
	@JoinColumn(name="gamme_id",referencedColumnName = "idGamme")
	private Gamme gamme;
	
	@ManyToOne @JsonIgnoreProperties("voiture") @Cascade(CascadeType.MERGE)
	@JoinColumn(name="groupe_id",referencedColumnName = "idGroup")
	private Groupe groupe;
//	
	@OneToMany(mappedBy = "voiture",fetch = FetchType.EAGER)
	@JsonIgnoreProperties("voiture")
	@JsonIgnore
	private Set<Option> options;
	
	@OneToMany(mappedBy = "voiture",fetch = FetchType.EAGER) @JsonIgnoreProperties("voiture")
	@JsonIgnore
	private Set<Reservation> reservations;


}
