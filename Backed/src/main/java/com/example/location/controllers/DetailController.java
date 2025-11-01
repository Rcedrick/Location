package com.example.location.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.location.models.Detail;
import com.example.location.services.DetailService;

@RestController
@RequestMapping("/details")
@CrossOrigin(origins = "http://localhost:5173")
public class DetailController {
	
	private final DetailService detailService;
	
	public DetailController(DetailService detailService) {
		this.detailService=detailService;
	}
	
	@GetMapping("/locationPar/{idL}")
	public List<Detail> getDetailLocationId(@PathVariable Long idL){
		return detailService.getDetailLocationId(idL);
	}
	
}
