package com.example.location.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.example.location.models.Categorie;
import com.example.location.models.Produit;
import com.example.location.repositories.CategoryRepository;
import com.example.location.repositories.ProduitRepository;

@Service
public class ProduitService {
	
	 
	 private final String uploadPath = "uploads/"; // Dossier où stocker les images

	    @Autowired
	    private ProduitRepository produitRepository;

	    public List<Produit> getAllProduits() {
	        return produitRepository.findAll();
	    }

	    public Optional<Produit> getProduitById(Long id) {
	        return produitRepository.findById(id);
	    }
	    
	    @Autowired
	    private CategoryRepository ct;
	    
	    
	    
	   
	    public Produit ajouterProduit(String nomP, Double prix, Integer stock, MultipartFile file, Long IdC, String description)throws IOException {
	    	Path upload= Paths.get(uploadPath);	    	
	    	if(!Files.exists(upload)){
	    		Files.createDirectory(upload);
	    	}
	    	String filename=System.currentTimeMillis()+'_'+file.getOriginalFilename();
	    	Path f=upload.resolve(filename);
	    	Files.copy(file.getInputStream(),f);
	    	Categorie cat=ct.findById(IdC).orElseThrow();
	    	Produit produit=new Produit();
	    	produit.setNomP(nomP);
	    	produit.setPrix(prix);
	    	produit.setStock(stock);
	    	produit.setDescription(description);
	    	produit.setImageP(filename);
	    	produit.setCategorie(cat);
	    	
	    	return produitRepository.save(produit);
	    }
	    
	    
	    public Produit modifierProduit(Long id,String nomP, Double prix, Integer stock, MultipartFile file, Long IdC, String description)throws IOException {
	    	Path upload= Paths.get(uploadPath);	    	
	    	if(!Files.exists(upload)){
	    		Files.createDirectory(upload);
	    	}
	    	String filename=System.currentTimeMillis()+'_'+file.getOriginalFilename();
	    	Path f=upload.resolve(filename);
	    	Files.copy(file.getInputStream(),f);
	    	Categorie cat=ct.findById(IdC).orElseThrow();
	    	Produit produit= produitRepository.findById(id).orElseThrow();
	    	produit.setNomP(nomP);
	    	produit.setPrix(prix);
	    	produit.setStock(stock);
	    	produit.setDescription(description);
	    	produit.setImageP(filename);
	    	produit.setCategorie(cat);
	    	
	    	return produitRepository.save(produit);
	    }
	    
	    
	    
	    
	    
	   	    
	    public ResponseEntity<String> deleteProduit(Long id) {
	        produitRepository.deleteById(id);
	        return ResponseEntity.ok("deleted successfoury");
	    }
	
}
