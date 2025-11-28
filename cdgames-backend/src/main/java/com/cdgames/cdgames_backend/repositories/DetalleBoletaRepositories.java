package com.cdgames.cdgames_backend.repositories;

import com.cdgames.cdgames_backend.entities.DetalleBoleta;
import com.cdgames.cdgames_backend.entities.Boleta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DetalleBoletaRepositories extends JpaRepository<DetalleBoleta, Long> {

    // Obtener todos los detalles de una boleta
    List<DetalleBoleta> findByBoleta(Boleta boleta);
}
