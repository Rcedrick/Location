package com.example.location.services;

import com.example.location.models.Detail;
import com.example.location.repositories.DetailRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class DetailService {
private final DetailRepository detailRepository;
	
	public DetailService(DetailRepository detailRepository) {
		this.detailRepository=detailRepository;
	}
	public List<Detail> getDetailLocationId(Long idL) {
	    return detailRepository.findByLocationIdL(idL);
	}

}
