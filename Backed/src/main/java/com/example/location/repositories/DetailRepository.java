package com.example.location.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.location.models.Detail;
import com.example.location.models.Utilisateur;

public interface DetailRepository extends JpaRepository<Detail, Long> {
	@Query("SELECT d FROM Detail d WHERE d.location.idL = :idL")
	List<Detail> findByLocationIdL(@Param("idL") Long idL);

}
