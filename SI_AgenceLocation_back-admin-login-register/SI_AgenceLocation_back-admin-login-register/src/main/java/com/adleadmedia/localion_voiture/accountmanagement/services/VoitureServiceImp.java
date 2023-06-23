package com.adleadmedia.localion_voiture.accountmanagement.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.adleadmedia.localion_voiture.accountmanagement.models.Voiture;
import com.adleadmedia.localion_voiture.accountmanagement.repositories.VoitureRepo;

import lombok.AllArgsConstructor;
import lombok.Data;

@Service
@Data
@AllArgsConstructor
public class VoitureServiceImp  implements VoitureService{
        private final VoitureRepo voitureRepo;
	@Override
	public Voiture ajouter(Voiture newvoiture) {
	
		return this.voitureRepo.save(newvoiture);
	}

	@Override
	public List<Voiture> lire() {
		
		return this.voitureRepo.findAll();
	}

	@Override
	public Voiture getById(int id) {
		return this.voitureRepo.findById(id).get();
	}

	@Override
	public Voiture modifier(int id, Voiture newvoiture) {
		
		return voitureRepo.findById(id).map(vtr ->{
			vtr.setNom(newvoiture.getNom());
			vtr.setModele(newvoiture.getModele());
			vtr.setCouleur(newvoiture.getCouleur());
			vtr.setEtat(newvoiture.getEtat());
			vtr.setImageV(newvoiture.getImageV());
			vtr.setFuelType(newvoiture.getFuelType());
			vtr.setPlace(newvoiture.getPlace());
			vtr.setPort(newvoiture.getPort());
			vtr.setPrix(newvoiture.getPrix());
			
			return voitureRepo.save(vtr);
			
		}).orElseThrow(()-> new RuntimeException("voiture nom trouve"));
	}

	@Override
	public void supprimer(int id) {
		this.voitureRepo.deleteById(id);
		
	}

	@Override
	public Voiture getByNom(String nom) {
		
		return this.voitureRepo.findBynom(nom);
	}

}
