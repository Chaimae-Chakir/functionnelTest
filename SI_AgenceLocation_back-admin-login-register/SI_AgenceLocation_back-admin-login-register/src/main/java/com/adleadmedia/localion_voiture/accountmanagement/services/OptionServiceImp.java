package com.adleadmedia.localion_voiture.accountmanagement.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.adleadmedia.localion_voiture.accountmanagement.models.Option;
import com.adleadmedia.localion_voiture.accountmanagement.repositories.OptionRepo;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class OptionServiceImp implements OptionService {

	private final OptionRepo optRepo;
	@Override
	public Option creer(Option option) {
		return optRepo.save(option);
	}

	@Override
	public List<Option> lire() {
		return optRepo.findAll();
	}

	@Override
	public Option getById(int id) {
		return optRepo.findById(id).get();
	}

	@Override
	public Option modifier(int id, Option option) {
		
		return optRepo.findById(id).map(p ->{
			p.setNomOp(option.getNomOp());
			p.setPrix(option.getPrix());
			return optRepo.save(p);
			
		}).orElseThrow(()-> new RuntimeException("option nom trouve"));
	}

	@Override
	public void supprimer(int id) {
		optRepo.deleteById(id);
		
	}

}
