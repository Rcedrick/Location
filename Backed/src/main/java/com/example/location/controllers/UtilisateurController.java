package com.example.location.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.location.models.Utilisateur;
import com.example.location.services.UtilisateurService;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/utilisateur")
@CrossOrigin(origins = "http://localhost:5173") // Pour ton frontend React
public class UtilisateurController {

    @Autowired
    private UtilisateurService utilisateurService;

    @GetMapping
    public List<Utilisateur> getAll() {
        return utilisateurService.getAllUtilisateurs();
    }

    @GetMapping("/{id}")
    public Optional<Utilisateur> getUtilisateurById(@PathVariable Long id) {
        return utilisateurService.getProduitById(id);
    }

    // 🟢 REGISTER
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> user) {
        try {
            String emailU = user.get("email");
            String passwordU = user.get("password");
            String nomCli = user.get("nom");
            String prenomCli = user.get("prenom");
            String phoneCli = user.get("phone");
            String adresseCli = user.get("adresse");
            String role = user.getOrDefault("role", "client");

            utilisateurService.ajouterUtilisateur(
                emailU, passwordU, role, nomCli, prenomCli, phoneCli, adresseCli
            );

            return ResponseEntity.ok("Utilisateur créé avec succès");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                 .body("Erreur lors de l'enregistrement");
        }
    }

    // 🔑 LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> user) {
        try {
            String email = user.get("email");
            String password = user.get("password");

            Utilisateur utilisateur = utilisateurService.authenticate(email, password);

            return ResponseEntity.ok(Map.of(
                "message", "Connexion réussie",
                "role", utilisateur.getRole(),
                "id", utilisateur.getIdU(),
                "email", utilisateur.getEmailU()
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                 .body(Map.of("error", "Email ou mot de passe incorrect"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUtilisateur(@PathVariable Long id) {
        return utilisateurService.deleteUtilisateur(id);
    }
}
