package com.adleadmedia.localion_voiture.accountmanagement.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adleadmedia.localion_voiture.accountmanagement.models.Option;
import com.adleadmedia.localion_voiture.accountmanagement.services.OptionService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/options")
@AllArgsConstructor
public class OptionController {
	
	private OptionService optionService;
	
	@GetMapping("/afficher")
	public List<Option> afficherAll(){
		return optionService.lire();
	}
	
	@PutMapping("/modifier/{id}")
	public Option modifier(@PathVariable int id,@RequestBody Option option) {
		return optionService.modifier(id, option);
	}
	
	@PostMapping("/create")
	public Option ajouterVoiture(@RequestBody Option option) {
		return optionService.creer(option);
	}
	
	public void supprimerOption(@PathVariable int id) {
		optionService.supprimer(id);
	}

}
