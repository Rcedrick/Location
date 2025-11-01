package com.example.location.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.location.models.Utilisateur;
import com.example.location.models.Client;
import com.example.location.repositories.ClientRepository;
import com.example.location.repositories.UtilisateurRepository;

@Service
public class UtilisateurService {

    private final String uploadPath = "uploadClient/";

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private ClientRepository clientRepository;

    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurRepository.findAll();
    }

    public Optional<Utilisateur> getProduitById(Long id) {
        return utilisateurRepository.findById(id);
    }

    // 🔑 Authentification
    public Utilisateur authenticate(String emailU, String passwordU) {
        return utilisateurRepository.findByEmailUAndPasswordU(emailU, passwordU)
                .orElseThrow(() -> new RuntimeException("Email ou mot de passe incorrect"));
    }

    // 🟢 Enregistrement (Register)
    public Utilisateur ajouterUtilisateur(String emailU, String passwordU, String role,
                                          String nomCli, String prenomCli,
                                          String phoneCli, String adresseCli) throws IOException {
        Client client = new Client();
        client.setNomCli(nomCli);
        client.setPrenomCli(prenomCli);
        client.setPhoneCli(phoneCli);
        client.setAdresseCli(adresseCli);
        client.setImageCli("default-avatar.png");

        client = clientRepository.save(client);

        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmailU(emailU);
        utilisateur.setPasswordU(passwordU);
        utilisateur.setClient(client);
        utilisateur.setRole(role != null ? role : "client");

        return utilisateurRepository.save(utilisateur);
    }

    public Utilisateur modifierUtilisateur(Long idU, String emailU, String passwordU,
                                           String nomCli, String prenomCli, String phoneCli,
                                           String adresseCli, MultipartFile imageCli) throws IOException {
        Utilisateur utilisateur = utilisateurRepository.findById(idU)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        utilisateur.setEmailU(emailU);
        utilisateur.setPasswordU(passwordU);

        Client client = utilisateur.getClient();
        client.setNomCli(nomCli);
        client.setPrenomCli(prenomCli);
        client.setPhoneCli(phoneCli);
        client.setAdresseCli(adresseCli);

        if (imageCli != null && !imageCli.isEmpty()) {
            Path uploadDir = Paths.get(uploadPath);
            if (!Files.exists(uploadDir)) {
                Files.createDirectories(uploadDir);
            }
            String filename = System.currentTimeMillis() + "_" + imageCli.getOriginalFilename();
            Path filePath = uploadDir.resolve(filename);
            Files.copy(imageCli.getInputStream(), filePath);
            client.setImageCli(filename);
        }

        clientRepository.save(client);
        return utilisateurRepository.save(utilisateur);
    }

    public ResponseEntity<String> deleteUtilisateur(Long id) {
        utilisateurRepository.deleteById(id);
        return ResponseEntity.ok("Utilisateur supprimé avec succès");
    }
}
