package com.example.location.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.location.models.Location;
import com.example.location.repositories.LocationRepository;
import com.example.location.services.LocationService;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/locations")
@CrossOrigin(origins = "http://localhost:5173")
public class LocationController {

    private final LocationService locationService;
    private final LocationRepository locationRepository; // Ajout du repository

    public LocationController(LocationService locationService, LocationRepository locationRepository) {
        this.locationService = locationService;
        this.locationRepository = locationRepository; 
    }

    // ✅ Récupérer toutes les locations
    @GetMapping
    public List<Location> getAll() {
        return locationService.getAllLocations();
    }
    
    // ✅ Récupérer une location par son ID
    @GetMapping("/{id}")
    public ResponseEntity<Location> getLocationById(@PathVariable Long id) {
        return locationRepository.findById(id)
                .map(location -> ResponseEntity.ok().body(location))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
    
    // ✅ Récupérer toutes les locations d'un client
    @GetMapping("/client/{idCli}")
    public List<Location> getAllLocationByIdCli(@PathVariable Long idCli) {
        return locationService.getAllLocationByIdCli(idCli);
    }
    
    // ✅ Mettre à jour le statut d'une location (ACCEPTEE / REFUSEE)
    @PutMapping("/{idL}/status")
    public ResponseEntity<?> updateLocationStatus(@PathVariable Long idL, @RequestBody Map<String, String> request) {
        String newStatus = request.get("status");
        try {
            Location updatedLocation = locationService.updateLocationStatus(idL, newStatus);
            return ResponseEntity.ok(updatedLocation);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Statut invalide !");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Location non trouvée !");
        }
    }

    @GetMapping("/status/attente")
    public List<Location> getLocationsAttente() {
        return locationService.getLocationsByStatusAttente();
    }
    
    @GetMapping("/status/valide")
    public List<Location> getLocationsValide() {
        return locationService.getLocationsByStatusValide();
    }
    
    @GetMapping("/validees-non-payees")
    public List<Location> getLocationsValideesNonPayees() {
        return locationService.getLocationsValideesNonPayees();
    }
    
    @GetMapping("/validees-payees")
    public List<Location> getLocationsValideesPayees() {
        return locationService.getLocationsValideesPayees();
    }
    
    @PutMapping("/{idL}/paiement")
    public Location updatePaiement(@PathVariable Long idL) {
        return locationService.updatePaiement(idL);
    }
    
    // ✅ Supprimer une location
    @DeleteMapping("/{idL}")
    public ResponseEntity<Void> deleteLocation(@PathVariable Long idL) {
        locationService.deleteLocation(idL);
        return ResponseEntity.noContent().build();
    }
}
