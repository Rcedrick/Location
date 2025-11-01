package com.example.location.controllers;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.location.DTO.CheckoutRequestDTO;
import com.example.location.DTO.ProduitDetail;
import com.example.location.models.Client;
import com.example.location.models.Detail;
import com.example.location.models.Location;
import com.example.location.models.Paiement;
import com.example.location.models.Produit;
import com.example.location.repositories.ClientRepository;
import com.example.location.repositories.DetailRepository;
import com.example.location.repositories.LocationRepository;
import com.example.location.repositories.ProduitRepository;
import com.example.location.models.Location.Status;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") 
public class CheckoutController {

    @Autowired
    private ClientRepository clientRepository;
    
    @Autowired
    private ProduitRepository produitRepository;
    
    @Autowired
    private LocationRepository locationRepository;
    
    @Autowired
    private DetailRepository detailRepository;
    
  

    @PostMapping("/checkout")
    public ResponseEntity<String> checkout(@RequestBody CheckoutRequestDTO checkoutRequest) {
        // Vérification du client
        Optional<Client> clientOptional = clientRepository.findById(checkoutRequest.getClientId());
        if (!clientOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Client non trouvé");
        }

        Client client = clientOptional.get();

        // Création de la location
        Location location = new Location();
        location.setClient(client);
        location.setDateDebut(checkoutRequest.getDateDebut());
        location.setDateFin(checkoutRequest.getDateFin());
        location.setTotal(checkoutRequest.getTotal());
        location.setDate(LocalDate.now()); // Date de création
        location.setValidation(Location.Status.ATTENTE); // Statut de validation à "ATTENTE" par défaut

        // Paiement
     String modeP = checkoutRequest.getModePaiement();
     if (modeP == null || modeP.trim().isEmpty()) {
    	    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Mode de paiement manquant");
    	}
    	location.setModeP(modeP);


      
        // Sauvegarde de la location
        locationRepository.save(location);

        // Création des détails de la commande (les produits)
        for (ProduitDetail detail : checkoutRequest.getPanier()) {
            Detail newDetail = new Detail();
            newDetail.setLocation(location);
            Produit produit = produitRepository.findById(detail.getProduitId())
                    .orElseThrow(() -> new RuntimeException("Produit non trouvé"));
            newDetail.setProduit(produit);
            newDetail.setNbrProd(detail.getQuantite());
            detailRepository.save(newDetail);
        }

        return ResponseEntity.ok("Commande effectuée avec succès");
    }


}

