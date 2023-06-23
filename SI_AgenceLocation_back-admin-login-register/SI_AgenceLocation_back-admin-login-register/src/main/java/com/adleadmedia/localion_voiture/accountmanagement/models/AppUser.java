package com.adleadmedia.localion_voiture.accountmanagement.models;


import java.util.List;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.springframework.beans.factory.annotation.Value;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class AppUser {
	@Id
	@GeneratedValue
	@Column(name = "user_id")
	private Long userId;
	@Column(nullable = false, length = 50)
	private String email;
	@Column(length = 30)
	private String username;
	@Column(nullable = false, length = 50)
	private String firstName;
	@Column(nullable = false, length = 50)
	private String lastName;
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String password;
	@Column(nullable = false, length = 50)
	private String phoneNumber;
	@Column(length = 50)
	private String picture;
	
	@Value("${statut:false}")
	private boolean statut;
	@JsonIgnore
	@ManyToOne(fetch = FetchType.EAGER) @JsonIgnoreProperties("user")
	@Cascade(CascadeType.ALL)
	private AppRole roles;

	public AppUser(String email, String username, String firstName, String lastName, String password, String phoneNumber, String picture) {
		this.email = email;
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.password = password;
		this.phoneNumber = phoneNumber;
		this.picture = picture;
	}
	
//	@OneToMany(mappedBy = "userApp") @JsonIgnoreProperties("userApp")
//	@JsonIgnore
//	private List<ActiviteLog> activites;
	
    @OneToOne(mappedBy = "user")
    @Cascade(CascadeType.ALL)
    @JsonIgnoreProperties
	@JsonIgnore
    private ActiviteLog activiteLog;
}

