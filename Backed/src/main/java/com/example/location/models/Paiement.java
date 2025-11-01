package com.example.location.models;

import jakarta.persistence.*;

@Entity
public class Paiement {
	@Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPai;
    private String modeP;
	public Long getIdPai() {
		return idPai;
	}
	public void setIdPai(Long idPai) {
		this.idPai = idPai;
	}
	public String getModeP() {
		return modeP;
	}
	public void setModeP(String modeP) {
		this.modeP = modeP;
	}
    
	@Override
    public String toString() {
        return "Paiement{" +
                "idPai=" + idPai +
                ", modeP='" + modeP + '\'' +
                '}';
    }

	    
    
}
