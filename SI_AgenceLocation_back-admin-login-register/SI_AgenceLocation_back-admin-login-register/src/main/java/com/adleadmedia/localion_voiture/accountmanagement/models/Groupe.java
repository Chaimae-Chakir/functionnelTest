package com.adleadmedia.localion_voiture.accountmanagement.models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
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
@Table(name="groupes")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Groupe {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idGroup;
	
	@Column(length = 20)
	private String nom;
	
	@Column(length = 5)
	private String abv;
	
	@OneToMany(mappedBy = "groupe") @JsonIgnoreProperties("groupe")
	@JsonIgnore
	private List<Voiture> voitures=new ArrayList<>();


}
