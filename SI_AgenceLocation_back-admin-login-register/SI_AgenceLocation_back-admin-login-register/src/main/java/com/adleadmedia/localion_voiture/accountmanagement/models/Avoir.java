package com.adleadmedia.localion_voiture.accountmanagement.models;

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
@Table(name="avoirs")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Avoir {
	@Id
	@GenericGenerator(name="avoir_id",strategy="com.adleadmedia.localion_voiture.accountmanagement.models.generators.AvoirGenerator")
	@GeneratedValue(generator = "avoir_id")
	private String id;
     
	@OneToOne
	@JoinColumn(name="devis_id",referencedColumnName = "id") @Cascade(CascadeType.MERGE)
	private Devis devis;
}
