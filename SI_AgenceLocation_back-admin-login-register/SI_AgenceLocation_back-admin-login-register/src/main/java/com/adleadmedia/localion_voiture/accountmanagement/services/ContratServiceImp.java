package com.adleadmedia.localion_voiture.accountmanagement.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.adleadmedia.localion_voiture.accountmanagement.models.Contrat;
import com.adleadmedia.localion_voiture.accountmanagement.repositories.ContratRepo;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ContratServiceImp implements ContratService {
        private final ContratRepo contratRepo;

		@Override
		public Contrat creer(Contrat contrat) {
			// TODO Auto-generated method stub
			return this.contratRepo.save(contrat);
		}

		@Override
		public List<Contrat> lire() {
			
			return this.contratRepo.findAll();
		}

		@Override
		public Contrat getById(String id) {
			
			return this.contratRepo.findById(id).get();
		}

		@Override
		public Contrat modifier(String id, Contrat contrat) {
			
			return contratRepo.findById(id).map(ctr ->{
				ctr.setRegistraction(contrat.getRegistraction());
				return contratRepo.save(ctr);
				
			}).orElseThrow(()-> new RuntimeException("contrat nom trouve"));
		}

		@Override
		public void supprimer(String id) {
			contratRepo.deleteById(id);
			
		}
        
        
        
        
}
