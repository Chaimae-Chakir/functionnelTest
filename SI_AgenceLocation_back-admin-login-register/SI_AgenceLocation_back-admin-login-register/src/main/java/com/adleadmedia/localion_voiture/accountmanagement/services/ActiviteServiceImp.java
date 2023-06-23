package com.adleadmedia.localion_voiture.accountmanagement.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.adleadmedia.localion_voiture.accountmanagement.models.ActiviteLog;
import com.adleadmedia.localion_voiture.accountmanagement.repositories.ActiviteRepo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Service
@Getter @Setter
@AllArgsConstructor
public class ActiviteServiceImp implements ActiviteService {
	
	private final ActiviteRepo activiteRepo;

	@Override
	public ActiviteLog creer(ActiviteLog actvLog) {
		
		return this.activiteRepo.save(actvLog);
	}

	@Override
	public List<ActiviteLog> lire() {
		
		return this.activiteRepo.findAll();
	}

	@Override
	public ActiviteLog getById(int id) {
		
		return this.activiteRepo.findById(id).get();
	}

	
	@Override
	public void supprimer(int id) {
		this.activiteRepo.deleteById(id);
		
	}

	@Override
	public ActiviteLog modifier(int id, ActiviteLog actvLog) {
		
           return activiteRepo.findById(id).map(actv ->{ 
        	 actv.setDateSingUp(actvLog.getDateSingUp());
			return activiteRepo.save(actv);
			
		}).orElseThrow(()-> new RuntimeException("activite nom trouvee"));
	}

	
}
