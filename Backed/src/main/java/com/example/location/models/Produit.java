package com.example.location.models;

import jakarta.persistence.*;
import jakarta.persistence.JoinColumn;

@Entity
public class Produit {
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long idP;
	    private String nomP;
	    private Double prix;
	    private Integer stock;
	    private String imageP;
	    
	    @Column(columnDefinition ="TEXT")
	    private String description;

	    @ManyToOne
	    @JoinColumn(name = "idC", nullable = false)
	    private Categorie categorie;

		public Long getIdP() {
			return idP;
		}

		public void setIdP(Long idP) {
			this.idP = idP;
		}

		public String getNomP() {
			return nomP;
		}

		public void setNomP(String nomP) {
			this.nomP = nomP;
		}

		public Double getPrix() {
			return prix;
		}

		public void setPrix(Double prix) {
			this.prix = prix;
		}

		public Integer getStock() {
			return stock;
		}

		public void setStock(Integer stock) {
			this.stock = stock;
		}

		public String getImageP() {
			return imageP;
		}

		public void setImageP(String imageP) {
			this.imageP = imageP;
		}

		public String getDescription() {
			return description;
		}

		public void setDescription(String description) {
			this.description = description;
		}

		public Categorie getCategorie() {
			return categorie;
		}

		public void setCategorie(Categorie categorie) {
			this.categorie = categorie;
		}

	    

	
	
	
}
