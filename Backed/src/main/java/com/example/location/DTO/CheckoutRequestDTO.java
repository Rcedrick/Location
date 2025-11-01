package com.example.location.DTO;

import java.time.LocalDate;
import java.util.List;

public class CheckoutRequestDTO {
	private Long clientId;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private Double total;
    private String modePaiement;
    private List<ProduitDetail> panier;
	public Long getClientId() {
		return clientId;
	}
	public void setClientId(Long clientId) {
		this.clientId = clientId;
	}
	public LocalDate getDateDebut() {
		return dateDebut;
	}
	public void setDateDebut(LocalDate dateDebut) {
		this.dateDebut = dateDebut;
	}
	public LocalDate getDateFin() {
		return dateFin;
	}
	public void setDateFin(LocalDate dateFin) {
		this.dateFin = dateFin;
	}
	public Double getTotal() {
		return total;
	}
	public void setTotal(Double total) {
		this.total = total;
	}
	public String getModePaiement() {
		return modePaiement;
	}
	public void setModePaiement(String modePaiement) {
		this.modePaiement = modePaiement;
	}
	public List<ProduitDetail> getPanier() {
		return panier;
	}
	public void setPanier(List<ProduitDetail> panier) {
		this.panier = panier;
	}
	
    
}
