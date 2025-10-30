package com.cdgames.cdgames_backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdgames.cdgames_backend.entities.Categoria;
import com.cdgames.cdgames_backend.repositories.CategoriaRepositories;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CategoriaServicesImpl implements CategoriaServices {
    @Autowired
    private CategoriaRepositories categoriaRepositories;

    @Override
    public Categoria crear(Categoria categoria) {
        return categoriaRepositories.save(categoria);
    }

    @Override
    public List<Categoria> listarTodas() {
        return categoriaRepositories.findAll();
    }

    @Override
    public Categoria obtenerPorId(Long id) {
        return categoriaRepositories.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
    }

    @Override
    public Categoria actualizar(Long id, Categoria categoriaActualizada) {
        Categoria existente = obtenerPorId(id);
        existente.setNombre(categoriaActualizada.getNombre());
        return categoriaRepositories.save(existente);
    }

    @Override
    public void eliminar(Long id) {
        if (!categoriaRepositories.existsById(id)) {
            throw new RuntimeException("Categoría no encontrada");
        }
        categoriaRepositories.deleteById(id);
    }
}
