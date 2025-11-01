package com.example.location.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.location.models.Client;
@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {

}
