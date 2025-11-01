package com.example.location.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.location.models.Categorie;
import com.example.location.models.Produit;
import com.example.location.services.CategoryService;
import com.example.location.services.ProduitService;


import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Locale.Category;
import java.util.Optional;

@RestController
@RequestMapping("/aa")
@CrossOrigin(origins = "http://localhost:5173") 
public class ProduitController {
@Autowired
	private ProduitService produitService;
@Autowired
    private CategoryService categorieService; // Pour récupérer la catégorie

    //Obtenir la liste des produits
    @GetMapping
    public List<Produit> getAll() {
        return produitService.getAllProduits();
    }
    
    @GetMapping("/image/{imageName}")
    public ResponseEntity<Resource> getImage(@PathVariable String imageName) throws MalformedURLException{
    	Path imagePath = Paths.get("uploads/").resolve(imageName);
    	Resource resource = new UrlResource(imagePath.toUri());
    	
    	return ResponseEntity.ok()
    			.contentType(MediaType.IMAGE_JPEG)
    			.body(resource);
    }
    // Obtenir un produit par ID
    @GetMapping("/{id}")
    public Optional<Produit> getProduitById(@PathVariable Long id) {
        return produitService.getProduitById(id);
    }

    // Ajouter un produit avec une catégorie
    @PostMapping()
    public Produit ajouterProduit(
    	@RequestParam String nomP
    	,@RequestParam Double prix
    	,@RequestParam Integer stock 
    	,@RequestParam MultipartFile imageP
    	,@RequestParam Long idC
    	,@RequestParam String description) throws IOException {
    	return produitService.ajouterProduit(nomP,prix,stock,imageP,idC,description);
    }

    
 //Modifierun produit avec une catégorie
    @PutMapping("/{id}")
    public Produit modifierProduit(@PathVariable Long id,
    	@RequestParam String nomP
    	,@RequestParam Double prix
    	,@RequestParam Integer stock 
    	,@RequestParam MultipartFile imageP
    	,@RequestParam Long idC
    	,@RequestParam String description) throws IOException {
    	return produitService.modifierProduit(id,nomP,prix,stock,imageP,idC,description);
    }

   
    // Supprimer un produit
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduit(@PathVariable Long id) {
       return produitService.deleteProduit(id);
    }
}
