package com.adleadmedia.localion_voiture.accountmanagement.models.generators;

import java.io.Serializable;
import java.time.YearMonth;
import java.util.UUID;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

public class FactureGenerator implements IdentifierGenerator {

	@Override
	public Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {
		// TODO Auto-generated method stub
		return "FAC"+YearMonth.now().toString()+""+ UUID.randomUUID().toString();
	}

}
