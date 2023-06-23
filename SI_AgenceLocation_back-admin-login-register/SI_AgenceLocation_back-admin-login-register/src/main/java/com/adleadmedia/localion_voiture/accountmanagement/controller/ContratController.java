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

import com.adleadmedia.localion_voiture.accountmanagement.models.Contrat;
import com.adleadmedia.localion_voiture.accountmanagement.services.ContratService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/contrats")
@AllArgsConstructor
public class ContratController {
	
	private final ContratService contratService;
	
	@PostMapping("/creer")
	public Contrat genererContrat(@RequestBody Contrat contrat) {
		return contratService.creer(contrat);
	}
    
	@GetMapping("/afficher")
	public List<Contrat> afficherAll(){
		return contratService.lire();
	}

	@PutMapping("/modifier/{id}")
	public Contrat modifierContrat(@PathVariable String id,@RequestBody Contrat contrat) {
		 return contratService.modifier(id, contrat);
	}
	
	@DeleteMapping("/supprimer/{id}")
	public void supprimerClient(@PathVariable String id) {
		contratService.supprimer(id);
	}
}
