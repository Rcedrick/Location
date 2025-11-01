package com.example.location.config;  // Assure-toi que le package est correct

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:5173") // ✅ Vérifie l'URL de ton frontend
                        .allowedMethods("GET", "POST", "PUT", "DELETE")
                        .allowCredentials(true); // ✅ Autoriser les cookies pour la session
            }
        };
    }
}
