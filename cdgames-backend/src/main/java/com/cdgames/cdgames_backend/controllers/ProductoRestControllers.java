package com.cdgames.cdgames_backend.controllers;

import com.cdgames.cdgames_backend.entities.Producto;
import com.cdgames.cdgames_backend.services.ProductoServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Swagger / OpenAPI
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/productos")
@Tag(name = "Productos", description = "Operaciones CRUD y filtros de productos")
public class ProductoRestControllers {

    @Autowired
    private ProductoServices productoServices;

    // CRUD
    @Operation(summary = "Crear un nuevo producto")
    @PostMapping
    public ResponseEntity<Producto> crear(@RequestBody Producto producto) {
        Producto nuevo = productoServices.crear(producto);
        return ResponseEntity.ok(nuevo);
    }

    @Operation(summary = "Listar todos los productos")
    @GetMapping
    public ResponseEntity<List<Producto>> listarTodos() {
        return ResponseEntity.ok(productoServices.listarTodos());
    }

    @Operation(summary = "Obtener un producto por su ID")
    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(productoServices.obtenerPorId(id));
    }

    @Operation(summary = "Actualizar un producto existente")
    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizarProducto(@PathVariable Long id, @RequestBody Producto productoActualizado) {
        Producto producto = productoServices.actualizar(id, productoActualizado);
        return ResponseEntity.ok(producto);
    }
    
    @Operation(summary = "Eliminar un producto por su ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        productoServices.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    // Extra rúbrica
    @Operation(summary = "Desactivar un producto (activo = false)")
    @PatchMapping("/{id}/desactivar")
    public ResponseEntity<Producto> desactivar(@PathVariable Long id) {
        return ResponseEntity.ok(productoServices.desactivar(id));
    }

    // Filtros / búsquedas
    @Operation(summary = "Buscar productos por nombre (contiene, sin distinguir mayúsculas)")
    @GetMapping("/buscar")
    public ResponseEntity<List<Producto>> buscarPorNombre(@RequestParam(required = false) String nombre) {
        return ResponseEntity.ok(productoServices.buscarPorNombre(nombre));
    }

    @Operation(summary = "Listar productos por categoría")
    @GetMapping("/categoria/{categoriaId}")
    public ResponseEntity<List<Producto>> buscarPorCategoria(@PathVariable Long categoriaId) {
        return ResponseEntity.ok(productoServices.buscarPorCategoria(categoriaId));
    }

    @Operation(summary = "Listar productos con stock bajo (<= umbral, por defecto 5)")
    @GetMapping("/stock-bajo")
    public ResponseEntity<List<Producto>> listarStockBajo(@RequestParam(required = false) Integer umbral) {
        return ResponseEntity.ok(productoServices.listarStockBajo(umbral));
    }
}
