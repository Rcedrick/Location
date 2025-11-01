package com.example.location.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.location.models.LocationDetail;

public interface LocationDetailRepository extends JpaRepository<LocationDetail, Long> {
    List<LocationDetail> findByLocationIdL(Long locationId);
}