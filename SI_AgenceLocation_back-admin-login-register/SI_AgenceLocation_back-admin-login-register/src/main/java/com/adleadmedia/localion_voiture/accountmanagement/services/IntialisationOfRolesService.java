package com.adleadmedia.localion_voiture.accountmanagement.services;

import org.springframework.stereotype.Service;

import com.adleadmedia.localion_voiture.accountmanagement.models.AppRole;
import com.adleadmedia.localion_voiture.accountmanagement.repositories.RoleRepo;

@Service
public class IntialisationOfRolesService {
	
    private RoleRepo roleRepo;

    public IntialisationOfRolesService(RoleRepo roleRepo){
        this.roleRepo = roleRepo;
    }

	
	public void initDatabase() {
		
		AppRole roleADmin = new AppRole("ADMIN");
		this.roleRepo.save(roleADmin);
		
		AppRole roleAssistant = new AppRole("ASSISTANT");
		this.roleRepo.save(roleAssistant);
		
		AppRole roleClient = new AppRole("CLIENT");
		this.roleRepo.save(roleClient);
		
	}
}
