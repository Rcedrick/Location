package com.example.location.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.location.models.Location;
import com.example.location.models.LocationDetail;
import com.example.location.models.Utilisateur;

public interface LocationRepository extends JpaRepository<Location, Long> {
	@Query("SELECT l FROM Location l WHERE l.client.idCli = :idCli")
	List<Location> findByLocationIdCli(@Param("idCli") Long idCli);
	List<Location> findByValidation(Location.Status status);
	List<Location> findByValidationAndPaiement(Location.Status status ,Boolean paiement);
}
