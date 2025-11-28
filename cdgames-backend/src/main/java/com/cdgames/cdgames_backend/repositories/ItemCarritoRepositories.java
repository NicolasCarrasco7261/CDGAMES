package com.cdgames.cdgames_backend.repositories;

import com.cdgames.cdgames_backend.entities.ItemCarrito;
import com.cdgames.cdgames_backend.entities.Carrito;
import com.cdgames.cdgames_backend.entities.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemCarritoRepositories extends JpaRepository<ItemCarrito, Long> {

    // Obtener todos los items del carrito de un usuario
    List<ItemCarrito> findByCarrito(Carrito carrito);

    // Verificar si un carrito ya contiene un producto específico
    boolean existsByCarritoAndProducto(Carrito carrito, Producto producto);
}
