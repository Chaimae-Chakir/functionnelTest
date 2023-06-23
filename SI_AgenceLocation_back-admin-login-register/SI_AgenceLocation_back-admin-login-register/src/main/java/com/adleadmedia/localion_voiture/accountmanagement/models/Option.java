package com.adleadmedia.localion_voiture.accountmanagement.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="options")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Option {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String nomOp;
	private double prix;
	
    @ManyToOne @JsonIgnoreProperties("option") @Cascade(CascadeType.MERGE)
	@JoinColumn(name="voiture_id",referencedColumnName = "idVoiture")
	private Voiture voiture;
}
