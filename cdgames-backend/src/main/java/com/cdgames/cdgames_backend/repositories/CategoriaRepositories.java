package com.cdgames.cdgames_backend.repositories;

import com.cdgames.cdgames_backend.entities.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepositories extends JpaRepository<Categoria, Long> {
    
}
