package com.example.location.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.location.models.Client;
import com.example.location.services.ClientService;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/client")
@CrossOrigin(origins = "http://localhost:5173") // Permet les requêtes depuis le frontend React
public class ClientController {

@Autowired
    private ClientService clientService; 

 

    //Obtenir la liste des clients
    @GetMapping
    public List<Client> getAll() {
        return clientService.getAllClients();
    }
    
    @GetMapping("/image/{imageName}")
    public ResponseEntity<Resource> getImage(@PathVariable String imageName) throws MalformedURLException{
    	Path imagePath = Paths.get("uploadClient/").resolve(imageName);
    	Resource resource = new UrlResource(imagePath.toUri());
    	
    	return ResponseEntity.ok()
    			.contentType(MediaType.IMAGE_JPEG)
    			.body(resource);
    }
    // Obtenir un client par ID
    @GetMapping("/{id}")
    public Optional<Client> getClienttById(@PathVariable Long id) {
        return clientService.getClientById(id);
    }

    // Ajouter un client
    @PostMapping()
    public Client ajouterProduit(
    	@RequestParam String nomCli
    	,@RequestParam String prenomCli
    	,@RequestParam String phoneCli 
    	,@RequestParam String adresseCli
    	,@RequestParam MultipartFile imageCli) throws IOException {
    	return clientService.ajouterClient(nomCli,prenomCli,phoneCli,adresseCli,imageCli);
    }

    
    //Modifierun client
    @PutMapping("/{id}")
    public Client modifierProduit(@PathVariable Long id,
    		@RequestParam String nomCli
        	,@RequestParam String prenomCli
        	,@RequestParam String phoneCli 
        	,@RequestParam String adresseCli
        	,@RequestParam MultipartFile imageCli) throws IOException {
        	return clientService.ajouterClient(nomCli,prenomCli,phoneCli,adresseCli,imageCli);
    }

   
    //Supprimer un produit
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduit(@PathVariable Long id) {
       return clientService.deleteProduit(id);
    }
}
