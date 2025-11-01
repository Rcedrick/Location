package com.example.location.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.location.models.Utilisateur;
@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
	Optional<Utilisateur> findByEmailUAndPasswordU(String emailU, String passwordU);
	Optional<Utilisateur> findByEmailU(String emailU); 

}
