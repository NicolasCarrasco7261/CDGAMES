package com.cdgames.cdgames_backend.services;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdgames.cdgames_backend.entities.Producto;
import com.cdgames.cdgames_backend.repositories.ProductoRepositories;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ProductoServicesImpl implements ProductoServices {

    @Autowired
    private ProductoRepositories productoRepositories;

    // Funciones CRUD

    @Override
    public Producto crear(Producto producto) {
        return productoRepositories.save(producto);
    }

    @Override
    public Producto obtenerPorId(Long id) {
        return productoRepositories.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }

    @Override
    public List<Producto> listarTodos() {
        return productoRepositories.findAll();
    }

    @Override
    public void eliminar(Long id) {
        if (!productoRepositories.existsById(id)) {
            throw new RuntimeException("Producto no encontrado");
        }
        productoRepositories.deleteById(id);
    }

    @Override
    public Producto actualizar(Long id, Producto productoActualizado) {
        Producto existente = obtenerPorId(id);
        existente.setDescripcion(productoActualizado.getDescripcion());
        existente.setPrecio(productoActualizado.getPrecio());
        existente.setNombre(productoActualizado.getNombre());
        existente.setCodigo(productoActualizado.getCodigo());
        existente.setStock(productoActualizado.getStock());
        existente.setImagenUrl(productoActualizado.getImagenUrl());
        return productoRepositories.save(existente);
    }

    @Override
    public Producto desactivar(Long id){
        Producto producto = obtenerPorId(id);
        producto.setActivo(false);
        return productoRepositories.save(producto);
    }

    // Métodos exigidos por la rúbrica

    @Override
    public List<Producto> buscarPorNombre(String nombre) {
        if (nombre == null || nombre.isBlank()) {
            return listarTodos();
        }
        String needle = nombre.toLowerCase();
        return productoRepositories.findAll().stream()
                .filter(p -> p.getNombre() != null && p.getNombre().toLowerCase().contains(needle))
                .collect(Collectors.toList());
    }

    @Override
    public List<Producto> buscarPorCategoria(Long categoriaId) {
        if (categoriaId == null) {
            return listarTodos();
        }
        return productoRepositories.findAll().stream()
                .filter(p -> p.getCategoria() != null && Objects.equals(p.getCategoria().getId(), categoriaId))
                .collect(Collectors.toList());
    }

    @Override
    public List<Producto> listarStockBajo(Integer umbral) {
        int limite = (umbral == null) ? 5 : Math.max(0, umbral);
        return productoRepositories.findAll().stream()
                .filter(p -> p.getStock() != null && p.getStock() <= limite)
                .collect(Collectors.toList());
    }
}
