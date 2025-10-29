package com.cdgames.cdgames_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration  // Marca esta clase como fuente de beans para Spring
public class SecurityBeansConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        // Crea una única instancia de BCryptPasswordEncoder para todo el proyecto
        return new BCryptPasswordEncoder();
    }
}
