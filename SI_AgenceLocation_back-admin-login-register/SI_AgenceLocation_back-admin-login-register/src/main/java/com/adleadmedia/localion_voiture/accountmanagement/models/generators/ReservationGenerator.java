package com.adleadmedia.localion_voiture.accountmanagement.models.generators;

import java.io.Serializable;
import java.time.YearMonth;
import java.util.UUID;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

public class ReservationGenerator implements IdentifierGenerator{

	@Override
	public Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {
		// TODO Auto-generated method stub
		return "RSV"+YearMonth.now().toString()+""+ UUID.randomUUID().toString();
	}

}
