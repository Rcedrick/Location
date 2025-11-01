package com.example.location.models;

import jakarta.persistence.*;

@Entity
public class Detail {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idD;

    @ManyToOne
    @JoinColumn(name = "idL")
    private Location location;

    @ManyToOne
    @JoinColumn(name = "idP")
    private Produit produit;

    private int nbrProd;

	public Long getIdD() {
		return idD;
	}

	public void setIdD(Long idD) {
		this.idD = idD;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public Produit getProduit() {
		return produit;
	}

	public void setProduit(Produit produit) {
		this.produit = produit;
	}

	public int getNbrProd() {
		return nbrProd;
	}

	public void setNbrProd(int nbrProd) {
		this.nbrProd = nbrProd;
	}
    
    
}
