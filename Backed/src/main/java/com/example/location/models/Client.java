package com.example.location.models;

import jakarta.persistence.*;

@Entity
public class Client {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCli;
    private String nomCli;
    private String prenomCli;
    private String phoneCli;
    private String adresseCli;
    private String imageCli;
	public Long getIdCli() {
		return idCli;
	}
	public void setIdCli(Long idCli) {
		this.idCli = idCli;
	}
	public String getNomCli() {
		return nomCli;
	}
	public void setNomCli(String nomCli) {
		this.nomCli = nomCli;
	}
	public String getPrenomCli() {
		return prenomCli;
	}
	public void setPrenomCli(String prenomCli) {
		this.prenomCli = prenomCli;
	}
	public String getPhoneCli() {
		return phoneCli;
	}
	public void setPhoneCli(String phoneCli) {
		this.phoneCli = phoneCli;
	}
	public String getAdresseCli() {
		return adresseCli;
	}
	public void setAdresseCli(String adresseCli) {
		this.adresseCli = adresseCli;
	}
	public String getImageCli() {
		return imageCli;
	}
	public void setImageCli(String imageCli) {
		this.imageCli = imageCli;
	}    
    
}
