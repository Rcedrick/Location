package com.example.location.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.location.models.Categorie;
import com.example.location.services.CategoryService;
@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController {

	 private final CategoryService categoryService;

	    public CategoryController(CategoryService categoryService) {
	        this.categoryService = categoryService;
	    }

	    // ✅ 1️⃣ Obtenir toutes les catégories
	    @GetMapping
	    public ResponseEntity<List<Categorie>> getAllCategories() {
	        List<Categorie> categories = categoryService.getAllCategories();
	        return new ResponseEntity<>(categories, HttpStatus.OK);
	    }

	    // ✅ 2️⃣ Obtenir une catégorie par ID
	    @GetMapping("/{id}")
	    public ResponseEntity<Categorie> getCategoryById(@PathVariable Long id) {
	        Optional<Categorie> categorie = categoryService.getCategoryById(id);
	        return categorie.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
	                        .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	    }

	    // ✅ 3️⃣ Ajouter une catégorie
	    @PostMapping
	    public ResponseEntity<Categorie> addCategory(@RequestBody Categorie categorie) {
	        Categorie newCategorie = categoryService.addCategory(categorie);
	        return new ResponseEntity<>(newCategorie, HttpStatus.CREATED);
	    }

	    // ✅ 4️⃣ Modifier une catégorie
	    @PutMapping("/{id}")
	    public ResponseEntity<Categorie> updateCategory(@PathVariable Long id, @RequestBody Categorie categorie) {
	        Categorie updatedCategorie = categoryService.updateCategory(id, categorie);
	        return updatedCategorie != null ? new ResponseEntity<>(updatedCategorie, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }

	    // ✅ 5️⃣ Supprimer une catégorie
	    @DeleteMapping("/{id}")
	    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
	        categoryService.deleteCategory(id);
	        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	    }
}
