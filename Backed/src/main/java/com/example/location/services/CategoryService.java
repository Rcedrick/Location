package com.example.location.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.location.models.Categorie;
import com.example.location.repositories.CategoryRepository;

@Service
public class CategoryService {
	private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Categorie> getAllCategories() {
        return categoryRepository.findAll();
    }
    

    public Optional<Categorie> getCategoryById(Long id) {
        return categoryRepository.findById(id);
    }

    public Categorie addCategory(Categorie categorie) {
        return categoryRepository.save(categorie);
    }

    public Categorie updateCategory(Long id, Categorie updatedCategorie) {
        return categoryRepository.findById(id).map(categorie -> {
            categorie.setNomC(updatedCategorie.getNomC());
            return categoryRepository.save(categorie);
        }).orElse(null);
    }

    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
}
