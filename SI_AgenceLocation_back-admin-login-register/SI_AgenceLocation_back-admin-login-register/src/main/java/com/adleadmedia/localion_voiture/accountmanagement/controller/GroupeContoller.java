package com.adleadmedia.localion_voiture.accountmanagement.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adleadmedia.localion_voiture.accountmanagement.models.Groupe;
import com.adleadmedia.localion_voiture.accountmanagement.services.GroupeService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/groupes")
@AllArgsConstructor
public class GroupeContoller {
     private GroupeService groupeService;
     
     @GetMapping("/afficher")
 	public List<Groupe> afficherAll(){
 		return groupeService.lire();
 	}
 	
 	@PutMapping("/modifier/{id}")
 	public Groupe modifier(@PathVariable int id,@RequestBody Groupe groupe) {
 		return groupeService.modifier(id,groupe);
 	}
 	
 	@PostMapping("/create")
 	public Groupe ajouterVoiture(@RequestBody Groupe groupe) {
 		return groupeService.creer(groupe);
 	}
 	
 	public void supprimerGroupe(@PathVariable int id) {
 		groupeService.supprimer(id);
 	}
}
