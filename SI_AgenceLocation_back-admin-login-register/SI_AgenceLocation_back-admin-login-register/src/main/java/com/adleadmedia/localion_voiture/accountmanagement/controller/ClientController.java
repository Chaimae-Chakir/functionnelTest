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

import com.adleadmedia.localion_voiture.accountmanagement.models.Client;
import com.adleadmedia.localion_voiture.accountmanagement.services.ClientService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("clients")
@AllArgsConstructor
public class ClientController {
	
	private ClientService clientServie;
	
	@PostMapping("/create")
	public Client ajouterClient(@RequestBody Client client) {
		return clientServie.creer(client);
	}
	
	@GetMapping("/afficher")
	public List<Client> afficherAll(){
		return clientServie.lire();
	}

	@PutMapping("/modifier/{id}")
	public Client modifierClient(@PathVariable int id,@RequestBody Client client) {
		 return clientServie.modifier(id, client);
	}
	
	@DeleteMapping("/supprimer/{id}")
	public void supprimerClient(@PathVariable int id) {
		clientServie.supprimer(id);
	}
}
