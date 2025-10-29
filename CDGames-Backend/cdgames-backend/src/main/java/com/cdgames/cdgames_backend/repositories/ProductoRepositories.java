package com.cdgames.cdgames_backend.repositories;

import com.cdgames.cdgames_backend.entities.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoRepositories extends JpaRepository<Producto, Long> {
    
}
