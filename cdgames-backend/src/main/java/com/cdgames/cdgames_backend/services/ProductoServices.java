package com.cdgames.cdgames_backend.services;

import com.cdgames.cdgames_backend.entities.Producto;
import java.util.List;

public interface ProductoServices {
    // Crear un nuevo producto
    Producto crear(Producto producto);
    // Listar todos los productos
    List<Producto> listarTodos();

    // Obtener un producto por su ID
    Producto obtenerPorId(Long id);

    // Actualizar un producto existente
    Producto actualizar(Long id, Producto productoActualizado);

    // Eliminar un producto por su ID
    void eliminar(Long id);

    // Desactivar un producto
    Producto desactivar(Long id);

    // Métodos según la rúbrica para productos
    
    // Buscar productos por nombre (contiene, ignora mayúsculas)
    List<Producto> buscarPorNombre(String nombre);

    // Buscar productos por categoría
    List<Producto> buscarPorCategoria(Long categoriaId);

    // Listar productos con stock bajo (<= umbral definido)
    List<Producto> listarStockBajo(Integer umbral);
}
