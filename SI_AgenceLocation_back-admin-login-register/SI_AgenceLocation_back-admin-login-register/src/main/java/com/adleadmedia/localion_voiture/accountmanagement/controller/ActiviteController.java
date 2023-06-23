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

import com.adleadmedia.localion_voiture.accountmanagement.models.ActiviteLog;
import com.adleadmedia.localion_voiture.accountmanagement.services.ActiviteService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("activites")
@AllArgsConstructor
public class ActiviteController {

	private final ActiviteService activiteService;
	
	@PostMapping("/create")
	public ActiviteLog ajouterClient(@RequestBody ActiviteLog actv) {
		return activiteService.creer(actv);
	}
	
	@GetMapping("/afficher")
	public List<ActiviteLog> afficherAll(){
		return activiteService.lire();
	}

	@PutMapping("/modifier/{id}")
	public ActiviteLog modifierClient(@PathVariable int id,@RequestBody ActiviteLog actv) {
		 return activiteService.modifier(id, actv);
	}
	
	@DeleteMapping("/supprimer/{id}")
	public void supprimerClient(@PathVariable int id) {
		activiteService.supprimer(id);
	}
}
