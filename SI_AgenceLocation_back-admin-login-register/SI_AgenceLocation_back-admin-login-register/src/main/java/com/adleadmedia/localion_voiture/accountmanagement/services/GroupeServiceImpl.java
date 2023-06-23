package com.adleadmedia.localion_voiture.accountmanagement.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.adleadmedia.localion_voiture.accountmanagement.models.Groupe;
import com.adleadmedia.localion_voiture.accountmanagement.repositories.GroupeRepo;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class GroupeServiceImpl implements GroupeService {
	
	private final GroupeRepo grpRepo;

	@Override
	public Groupe creer(Groupe groupe) {
		return this.grpRepo.save(groupe);
	}

	@Override
	public List<Groupe> lire() {
		// TODO Auto-generated method stub
		return this.grpRepo.findAll();
	}

	@Override
	public Groupe getById(int id) {
		// TODO Auto-generated method stub
		return this.grpRepo.findById(id).get();
	}

	@Override
	public Groupe modifier(int id, Groupe groupe) {
		return grpRepo.findById(id).map(p ->{
			p.setNom(groupe.getNom());
			p.setAbv(groupe.getAbv());
			return grpRepo.save(p);
			
		}).orElseThrow(()-> new RuntimeException("groupe nom trouve"));
	}

	@Override
	public void supprimer(int id) {
		// TODO Auto-generated method stub
		grpRepo.deleteById(id);
	}
	
	
	

}
