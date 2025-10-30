package com.cdgames.cdgames_backend.services;

import com.cdgames.cdgames_backend.entities.Categoria;
import java.util.List;

public interface CategoriaServices {
    // Crear una nueva categoría
    Categoria crear(Categoria categoria);

    // Listar todas las categorías
    List<Categoria> listarTodas();

    // Obtener una categoría por su ID
    Categoria obtenerPorId(Long id);

    // Actualizar una categoría existente
    Categoria actualizar(Long id, Categoria categoriaActualizada);

    // Eliminar una categoría por su ID
    void eliminar(Long id);
}