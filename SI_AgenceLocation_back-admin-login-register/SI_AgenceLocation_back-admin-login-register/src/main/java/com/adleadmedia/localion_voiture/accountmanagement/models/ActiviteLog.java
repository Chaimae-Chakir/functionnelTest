package com.adleadmedia.localion_voiture.accountmanagement.models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity @Table(name="activitesLog")
@Getter
@Setter @AllArgsConstructor @NoArgsConstructor

public class ActiviteLog {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date dateSingUp;
	
//	@ManyToOne @JsonIgnoreProperties("activiteLog") @Cascade(CascadeType.MERGE)
//	@JoinColumn(name="userId",referencedColumnName = "user_id")
//	private AppUser userApp;
	
    @OneToOne
    @JoinColumn(name = "user_id")
    private AppUser user;
}
