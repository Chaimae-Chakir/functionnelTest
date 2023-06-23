package com.adleadmedia.localion_voiture.accountmanagement.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adleadmedia.localion_voiture.accountmanagement.models.Voiture;
import com.adleadmedia.localion_voiture.accountmanagement.services.VoitureService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/voitures")
@AllArgsConstructor
public class VoitureController {
	
	private VoitureService voitureService;
	
	@GetMapping("/afficher")
	public List<Voiture> getAll(){
		return this.voitureService.lire();
	}
	
	@PutMapping("/modifier/{id}")
	public Voiture modifier(@PathVariable int id,@RequestBody Voiture voiture) {
		return voitureService.modifier(id, voiture);
	}
	
	@PostMapping("/create")
	public Voiture ajouterVoiture(@RequestBody Voiture voiture) {
		return voitureService.ajouter(voiture);
	}
	
	@DeleteMapping("/delete/{id}")
	public void supprimerVoiture(@PathVariable int id) {
		voitureService.supprimer(id);
	}
	
	
	@GetMapping("/afficher/{nom}")
	public Voiture getByNom(@PathVariable String nom) {
		return voitureService.getByNom(nom);
	}
        
}
