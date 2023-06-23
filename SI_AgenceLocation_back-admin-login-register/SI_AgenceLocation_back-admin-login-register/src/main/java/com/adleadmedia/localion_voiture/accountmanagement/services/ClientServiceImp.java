package com.adleadmedia.localion_voiture.accountmanagement.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.adleadmedia.localion_voiture.accountmanagement.models.Client;
import com.adleadmedia.localion_voiture.accountmanagement.repositories.ClientRepo;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ClientServiceImp implements ClientService{

	private final ClientRepo clientRepo;
	@Override
	public Client creer(Client client) {
		// TODO Auto-generated method stub
		return this.clientRepo.save(client);
	}

	@Override
	public List<Client> lire() {
		// TODO Auto-generated method stub
		return this.clientRepo.findAll();
	}

	@Override
	public Client getById(int id) {
		
		return this.clientRepo.findById(id).get();
	}

	@Override
	public Client modifier(int id, Client client) {
		return clientRepo.findById(id).map(p ->{
		p.setNomCl(client.getNomCl());
		p.setPrenom(client.getPrenom());
		p.setAdresse(client.getAdresse());
		p.setEmail(client.getEmail());
		p.setTel(client.getTel());
		
		p.setPaysEmssCin(client.getPaysEmssCin());
		p.setCin(client.getCin());
		p.setDateEmssCin(client.getDateEmssCin());
		p.setDateExpCin(client.getDateExpCin());
		
		p.setNumPermis(client.getNumPermis());
		p.setDateEmissionPermis(client.getDateEmissionPermis());
		p.setDateExpPermis(client.getDateExpPermis());
			return clientRepo.save(p);
			
		}).orElseThrow(()-> new RuntimeException("client nom trouve"));
	}

	@Override
	public void supprimer(int id) {
		clientRepo.deleteById(id);
		
	}

}
