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

import com.example.location.models.Client;
import com.example.location.repositories.ClientRepository;

@Service
public class ClientService {
	
	 
	 private final String uploadPath = "uploadClient/"; // Dossier où stocker les images

	    @Autowired
	    private ClientRepository clientRepository;

	    public List<Client> getAllClients() {
	        return clientRepository.findAll();
	    }

	    public Optional<Client> getClientById(Long id) {
	        return clientRepository.findById(id);
	    }
	    
	   
	    public Client ajouterClient(String nomCli, String prenomCli, String phoneCli, String adresseCli, MultipartFile file)throws IOException {
	    	Path upload= Paths.get(uploadPath);	    	
	    	if(!Files.exists(upload)){
	    		Files.createDirectory(upload);
	    	}
	    	String filename=System.currentTimeMillis()+'_'+file.getOriginalFilename();
	    	Path f=upload.resolve(filename);
	    	Files.copy(file.getInputStream(),f);
	    	Client client=new Client();
	    	client.setNomCli(nomCli);
	    	client.setPrenomCli(prenomCli);
	    	client.setPhoneCli(phoneCli);
	    	client.setAdresseCli(adresseCli);
	    	client.setImageCli(filename);
	    	
	    	return clientRepository.save(client);
	    }
	    
	    
	    public Client modifierClient(Long id,String nomCli, String prenomCli, String phoneCli, String adresseCli, MultipartFile file)throws IOException {
	    	Path upload= Paths.get(uploadPath);	    	
	    	if(!Files.exists(upload)){
	    		Files.createDirectory(upload);
	    	}
	    	String filename=System.currentTimeMillis()+'_'+file.getOriginalFilename();
	    	Path f=upload.resolve(filename);
	    	Files.copy(file.getInputStream(),f);
	    	Client client= clientRepository.findById(id).orElseThrow();
	    	client.setNomCli(nomCli);
	    	client.setPrenomCli(prenomCli);
	    	client.setPhoneCli(phoneCli);
	    	client.setAdresseCli(adresseCli);
	    	client.setImageCli(filename);
	    	
	    	return clientRepository.save(client);
	    }
	    
	    
	    
	    
	    
	   	    
	    public ResponseEntity<String> deleteProduit(Long id) {
	        clientRepository.deleteById(id);
	        return ResponseEntity.ok("deleted successfoury");
	    }
	
}
