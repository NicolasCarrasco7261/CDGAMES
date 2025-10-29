package com.cdgames.cdgames_backend.repositories;

import com.cdgames.cdgames_backend.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepositories extends JpaRepository<Usuario, Long> {

    // Necesario para el endpoint de login (buscar por email)
    Optional<Usuario> findByEmail(String email);
}