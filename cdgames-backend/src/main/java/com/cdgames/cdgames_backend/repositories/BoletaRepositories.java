package com.cdgames.cdgames_backend.repositories;

import com.cdgames.cdgames_backend.entities.Boleta;
import com.cdgames.cdgames_backend.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoletaRepositories extends JpaRepository<Boleta, Long> {

    // Historial de compras de un cliente
    List<Boleta> findByCliente(Usuario cliente);
}
