package com.adleadmedia.localion_voiture.accountmanagement.models;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class AppRole {

    @Id
    @Column(length = 10)
    private String libelle;
    @OneToMany(mappedBy = "roles")


    private List<AppUser> users = new ArrayList<>();

    public AppRole(String libelle){
        this.libelle = libelle;
    }

}