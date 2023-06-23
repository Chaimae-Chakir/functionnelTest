package com.adleadmedia.localion_voiture.accountmanagement.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adleadmedia.localion_voiture.accountmanagement.models.Gamme;
import com.adleadmedia.localion_voiture.accountmanagement.services.GammeService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/gammes")
public class GammeController {
	
	private final GammeService gammeService;
	
	
	@GetMapping("/afficher")
	public List<Gamme> afficherAll(){
		return this.gammeService.lire();
	}
	
	@PutMapping("/modifier/{id}")
	public Gamme modifier(@PathVariable int id,@RequestBody Gamme gamme) {
		return gammeService.modifier(id,gamme);
	}
	
	@PostMapping("/create")
	public Gamme ajouterGamme(@RequestBody Gamme gamme) {
		return gammeService.creer(gamme);
	}
	
	public void supprimerGamme(@PathVariable int id) {
		gammeService.supprimer(id);
	}

}
