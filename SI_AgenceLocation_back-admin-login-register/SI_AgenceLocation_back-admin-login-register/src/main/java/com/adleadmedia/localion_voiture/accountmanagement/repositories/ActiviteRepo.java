package com.adleadmedia.localion_voiture.accountmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.adleadmedia.localion_voiture.accountmanagement.models.ActiviteLog;

public interface ActiviteRepo extends JpaRepository<ActiviteLog, Integer>{

}
