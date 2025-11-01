package com.example.location.models;

import java.time.LocalDate;
import java.util.List;
import jakarta.persistence.*;

@Entity
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idL;

    private LocalDate date;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private Double total;
    private String modeP;

    @Enumerated(EnumType.STRING) // Corrige l'erreur
    
    private Status validation; 
    
    @Column(columnDefinition = "BOOLEAN DEFAULT false")
    private Boolean paiement = false;
    
    public enum Status {
        ATTENTE, // En attente de validation
        VALIDEE, // Validée
        REJETEE  // Rejetée
    }
    
    @ManyToOne
    @JoinColumn(name = "idCli")
    private Client client;

	public Long getIdL() {
		return idL;
	}

	public void setIdL(Long idL) {
		this.idL = idL;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
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

	public String getModeP() {
		return modeP;
	}

	public void setModeP(String modeP) {
		this.modeP = modeP;
	}

	public Status getValidation() {
		return validation;
	}

	public void setValidation(Status validation) {
		this.validation = validation;
	}

	public Boolean getPaiement() {
		return paiement;
	}

	public void setPaiement(Boolean paiement) {
		this.paiement = paiement;
	}

	public Client getClient() {
		return client;
	}

	public void setClient(Client client) {
		this.client = client;
	}

   

    

   
}
