package com.example.location.controllers;

import java.util.Map;
import java.util.Optional;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.location.models.Utilisateur;
import com.example.location.services.UtilisateurService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/session")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class SessionController {

    @Autowired
    private UtilisateurService utilisateurService;

    // ✅ Connexion
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials, HttpSession session) {
        try {
            Utilisateur utilisateur = utilisateurService.authenticate(credentials.get("email"), credentials.get("password"));
            
            // 🟢 Stocker l'ID et le rôle dans la session
            session.setAttribute("userId", utilisateur.getIdU());
            session.setAttribute("role", utilisateur.getRole());

            // 🟢 Retourner une réponse avec les détails de l'utilisateur
            Map<String, Object> response = new HashMap<>();
            response.put("id", utilisateur.getIdU());
            response.put("email", utilisateur.getEmailU());
            response.put("role", utilisateur.getRole()); // 🟢 Ajout du rôle
            
            return ResponseEntity.ok(response); // 🟢 Retourne une réponse JSON

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email ou mot de passe incorrect");
        }
    }

    // ✅ Déconnexion
    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate(); // Supprimer la session
        return ResponseEntity.noContent().build(); 
    }

    // ✅ Récupérer les infos de l'utilisateur connecté
    @GetMapping("/utilisateur")
    public ResponseEntity<?> getUserSession(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        String role = (String) session.getAttribute("role");
        
        System.out.println("userId: " + userId); // Log pour vérifier la session
        System.out.println("role: " + role);   // Log pour vérifier le rôle

        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Aucun utilisateur connecté");
        }

        Optional<Utilisateur> utilisateurOpt = utilisateurService.getProduitById(userId);
        if (utilisateurOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Utilisateur non trouvé");
        }

        Utilisateur utilisateur = utilisateurOpt.get();
        Map<String, Object> response = Map.of(
            "id", utilisateur.getIdU(),
            "email", utilisateur.getEmailU(),
            "role", role,
            "nom", utilisateur.getClient().getNomCli(),
            "prenom", utilisateur.getClient().getPrenomCli(),
            "adresse", utilisateur.getClient().getAdresseCli(),
            "phone", utilisateur.getClient().getPhoneCli()
        );

        return ResponseEntity.ok(response);
    }

}
