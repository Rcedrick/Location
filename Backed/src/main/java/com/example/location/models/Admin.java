package com.example.location.models;

import jakarta.persistence.*;
@Entity
public class Admin {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idA;
    private String nomA;
    private String prenomA;
    private String emailA;
	public Long getIdA() {
		return idA;
	}
	public void setIdA(Long idA) {
		this.idA = idA;
	}
	public String getNomA() {
		return nomA;
	}
	public void setNomA(String nomA) {
		this.nomA = nomA;
	}
	public String getPrenomA() {
		return prenomA;
	}
	public void setPrenomA(String prenomA) {
		this.prenomA = prenomA;
	}
	public String getEmailA() {
		return emailA;
	}
	public void setEmailA(String emailA) {
		this.emailA = emailA;
	}
    
    

}
