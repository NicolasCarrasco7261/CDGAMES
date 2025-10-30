package com.cdgames.cdgames_backend.controllers;

import com.cdgames.cdgames_backend.entities.Categoria;
import com.cdgames.cdgames_backend.services.CategoriaServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

// Swagger / OpenAPI
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/categorias")
@Tag(name = "Categorías", description = "Gestión de categorías de productos")
public class CategoriaRestControllers {

    @Autowired
    private CategoriaServices categoriaServices;

    @Operation(summary = "Crear una nueva categoría")
    @PostMapping
    public ResponseEntity<Categoria> crear(@RequestBody Categoria categoria) {
        Categoria nuevaCategoria = categoriaServices.crear(categoria);
        return ResponseEntity.ok(nuevaCategoria);
    }

    @Operation(summary = "Listar todas las categorías registradas")
    @GetMapping
    public ResponseEntity<List<Categoria>> listarTodas() {
        List<Categoria> categorias = categoriaServices.listarTodas();
        return ResponseEntity.ok(categorias);
    }

    @Operation(summary = "Obtener una categoría por su ID")
    @GetMapping("/{id}")
    public ResponseEntity<Categoria> obtenerPorId(@PathVariable Long id) {
        Categoria categoria = categoriaServices.obtenerPorId(id);
        return ResponseEntity.ok(categoria);
    }

    @Operation(summary = "Actualizar los datos de una categoría existente")
    @PutMapping("/{id}")
    public ResponseEntity<Categoria> actualizar(@PathVariable Long id, @RequestBody Categoria categoriaActualizada) {
        Categoria actualizada = categoriaServices.actualizar(id, categoriaActualizada);
        return ResponseEntity.ok(actualizada);
    }

    @Operation(summary = "Eliminar una categoría por su ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCategoria(@PathVariable Long id) {
        categoriaServices.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}