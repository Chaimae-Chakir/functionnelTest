package com.adleadmedia.localion_voiture.accountmanagement.models;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="clients")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Client {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idClient;
	
	private String nomCl;
	private String prenom;
	private String email;
	private String cin;
	private String paysEmssCin;
	private Date dateEmssCin;
	private Date dateExpCin;
	private int tel;
	private String adresse;
	private String numPermis;
	private Date dateEmissionPermis;
	private Date dateExpPermis;
	
	@OneToMany(mappedBy = "client") @JsonIgnoreProperties("reservation")
	@JsonIgnore
	private List<Reservation> reservations=new ArrayList<>();
}
