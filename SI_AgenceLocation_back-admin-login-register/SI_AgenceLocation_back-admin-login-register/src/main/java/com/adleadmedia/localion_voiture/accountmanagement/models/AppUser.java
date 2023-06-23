package com.adleadmedia.localion_voiture.accountmanagement.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
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

	private String password;

	@Column(nullable = false, length = 50)
	private String phoneNumber;

	@Column(length = 50)
	private String picture;

	private boolean statut;

	@ManyToOne(fetch = FetchType.EAGER)
	@JsonIgnoreProperties("users")
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

	@OneToOne(mappedBy = "user")
	@JsonIgnoreProperties
	@JsonIgnore
	private ActiviteLog activiteLog;

	public List<AppRole> getRoles() {
		List<AppRole> roleList = new ArrayList<>();
		roleList.add(roles);
		return roleList;
	}
}
