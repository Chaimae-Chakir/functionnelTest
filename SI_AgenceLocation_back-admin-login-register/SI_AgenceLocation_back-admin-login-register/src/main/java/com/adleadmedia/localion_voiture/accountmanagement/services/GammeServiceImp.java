package com.adleadmedia.localion_voiture.accountmanagement.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.adleadmedia.localion_voiture.accountmanagement.models.Gamme;
import com.adleadmedia.localion_voiture.accountmanagement.repositories.GammeRepo;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class GammeServiceImp implements GammeService{
	
	private final GammeRepo gammeRepo;
	@Override
	
	public Gamme creer(Gamme gamme) {
		// TODO Auto-generated method stub
		return this.gammeRepo.save(gamme);
	}

	@Override
	public List<Gamme> lire() {
		// TODO Auto-generated method stub
		return this.gammeRepo.findAll();
	}

	@Override
	public Gamme getById(int id) {
		// TODO Auto-generated method stub
		return this.gammeRepo.findById(id).get();
	}

	@Override
	public Gamme modifier(int id, Gamme gamme) {
		return gammeRepo.findById(id).map(p ->{
			p.setNom(gamme.getNom());
			return gammeRepo.save(p);
			
		}).orElseThrow(()-> new RuntimeException("gamme nom trouve"));
	}

	@Override
	public void supprimer(int id) {
		gammeRepo.deleteById(id);
		
	}

}
