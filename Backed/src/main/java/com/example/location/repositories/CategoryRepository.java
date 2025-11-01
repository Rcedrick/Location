package com.example.location.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.location.models.Categorie;

public interface CategoryRepository extends JpaRepository<Categorie, Long>{

}
