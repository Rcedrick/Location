package com.example.location.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.location.models.Detail;
import com.example.location.models.Location;
import com.example.location.models.LocationDetail;
import com.example.location.models.Paiement;
import com.example.location.models.Produit;
import com.example.location.repositories.DetailRepository;
import com.example.location.repositories.LocationDetailRepository;
import com.example.location.repositories.LocationRepository;

@Service
public class LocationService {
	
	@Autowired
	 	private  LocationRepository locationRepository;
	    private  DetailRepository detailRepository;
	  
	    // Récupérer toutes les locations
	    public List<Location> getAllLocations() {
	        return locationRepository.findAll();
	    }
	    
	    public List<Location> getAllLocationByIdCli(Long idCli) {
	        return locationRepository.findByLocationIdCli(idCli);
	    }

	    public Optional<Location> getLocationById(Long id) {
	        return locationRepository.findById(id);
	    }    

	    
	    public List<Location> getLocationsByStatusAttente() {
	        return locationRepository.findByValidation(Location.Status.ATTENTE);
	    }
	    
	    public List<Location> getLocationsByStatusValide() {
	        return locationRepository.findByValidation(Location.Status.VALIDEE);
	    }
	    
	    public List<Location> getLocationsValideesNonPayees(){
	    	return locationRepository.findByValidationAndPaiement(Location.Status.VALIDEE ,false);
	    } 
	    
	    
	    public List<Location> getLocationsValideesPayees(){
	    	return locationRepository.findByValidationAndPaiement(Location.Status.VALIDEE ,true);
	    } 
	    
	    public Location updateLocationStatus(Long idL, String newStatus) {
	        Optional<Location> optionalLocation = locationRepository.findById(idL);
	        if (optionalLocation.isPresent()) {
	            Location location = optionalLocation.get();
	            try {
	                Location.Status statusEnum = Location.Status.valueOf(newStatus.toUpperCase()); // Convertit en ENUM
	                location.setValidation(statusEnum);
	                return locationRepository.save(location);
	            } catch (IllegalArgumentException e) {
	                throw new IllegalArgumentException("Statut invalide : " + newStatus);
	            }
	        } else {
	            throw new RuntimeException("Location non trouvée !");
	        }
	    }
	    
	    
	    public Location updatePaiement(Long idL) {
	        Optional<Location> optionalLocation = locationRepository.findById(idL);
	        if (optionalLocation.isPresent()) {
	            Location location = optionalLocation.get();
	            
	            // Vérifier si déjà payé
	            if (location.getPaiement()) {
	                throw new RuntimeException("Le paiement a déjà été effectué !");
	            }

	            location.setPaiement(true); // Modifier la valeur à true
	            return locationRepository.save(location); // Sauvegarder la modification
	        } else {
	            throw new RuntimeException("Location non trouvée !");
	        }
	    }
	    

	    // Supprimer une location
	    public void deleteLocation(Long idL) {
	        locationRepository.deleteById(idL);
	    }
}
