package com.cdgames.cdgames_backend.repositories;

import com.cdgames.cdgames_backend.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepositories extends JpaRepository<Usuario, Long> {

    // Buscar usuario por email (para login)
    Optional<Usuario> findByEmail(String email);

    // Opcional: si deseas buscar también por nombre (similar a username del profe)
    Optional<Usuario> findByNombre(String nombre);

    // Validaciones de duplicados
    boolean existsByEmail(String email);
    boolean existsByNombre(String nombre);
}