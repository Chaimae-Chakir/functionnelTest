package com.adleadmedia.localion_voiture.accountmanagement.exception;

import java.util.List;

import lombok.Data;

@Data
public class ErrorLocationManagement {
	   private String code;
	    private String message;
	    private String type;
	    private String context;
	    private String exception;
	    private String component;
	    private String application;
	    private String timestamp;
	    private List<ErrorLocationManagement> errors;
	    private StackTraceLocationManagement stackTrace;
	    public List<ErrorLocationManagement> getErrors() {
	        return errors;
	    }

	    public void addError(ErrorLocationManagement errorLocationManagement) {
	        errors.add(errorLocationManagement);
	    }

}
