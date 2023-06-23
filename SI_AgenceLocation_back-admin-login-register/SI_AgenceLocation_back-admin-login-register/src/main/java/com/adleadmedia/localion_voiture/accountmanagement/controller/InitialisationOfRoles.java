package com.adleadmedia.localion_voiture.accountmanagement.controller;

import javax.annotation.PostConstruct;

import org.springframework.web.bind.annotation.RestController;

import com.adleadmedia.localion_voiture.accountmanagement.services.IntialisationOfRolesService;

@RestController
public class InitialisationOfRoles {

	private IntialisationOfRolesService intialisationOfRolesService;
	
	public InitialisationOfRoles(IntialisationOfRolesService intialisationOfRolesService) {
		this.intialisationOfRolesService = intialisationOfRolesService;
	}
	
    @PostConstruct
    public void initRoleAndUser() {
    	this.intialisationOfRolesService.initDatabase();
    }	
}
