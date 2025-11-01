package com.example.location.models;

import jakarta.persistence.*;
@Entity
public class Categorie {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idC;
    private String nomC;
	public Long getIdC() {
		return idC;
	}
	public void setIdC(Long idC) {
		this.idC = idC;
	}
	public String getNomC() {
		return nomC;
	}
	public void setNomC(String nomC) {
		this.nomC = nomC;
	}
  

       
    
}
