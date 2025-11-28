package com.cdgames.cdgames_backend.repositories;

import com.cdgames.cdgames_backend.entities.Carrito;
import com.cdgames.cdgames_backend.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CarritoRepositories extends JpaRepository<Carrito, Long> {
    Optional<Carrito> findByUsuario(Usuario usuario);
}
