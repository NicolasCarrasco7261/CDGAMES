package com.cdgames.cdgames_backend.service;

import com.cdgames.cdgames_backend.entities.Categoria;
import com.cdgames.cdgames_backend.entities.Producto;
import com.cdgames.cdgames_backend.repositories.ProductoRepositories;
import com.cdgames.cdgames_backend.services.ProductoServicesImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
public class ProductoServiceImplTest {
    @InjectMocks
    private ProductoServicesImpl service;

    @Mock
    private ProductoRepositories repo;

    Categoria cat1, cat2;
    Producto p1, p2, p3;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);

        cat1 = new Categoria(); cat1.setId(1L); cat1.setNombre("Acción");
        cat2 = new Categoria(); cat2.setId(2L); cat2.setNombre("RPG");

        p1 = new Producto(); p1.setNombre("Zelda"); p1.setStock(2); p1.setCategoria(cat2); p1.setActivo(true);
        p2 = new Producto(); p2.setNombre("MARIO kart"); p2.setStock(8); p2.setCategoria(cat1); p2.setActivo(true);
        p3 = new Producto(); p3.setNombre("Metroid"); p3.setStock(5); p3.setCategoria(cat1); p3.setActivo(true);
    }

    @Test
    @DisplayName("listarStockBajo: retorna productos con stock <= umbral")
    void stockBajo_ok() {
        when(repo.findAll()).thenReturn(List.of(p1, p2, p3));

        var result = service.listarStockBajo(5);

        assertThat(result).extracting(Producto::getNombre)
                .containsExactlyInAnyOrder("Zelda", "Metroid");
        verify(repo).findAll();
    }

    @Test
    @DisplayName("buscarPorNombre: ignora mayúsculas/minúsculas")
    void buscarPorNombre_ok() {
        when(repo.findAll()).thenReturn(List.of(p1, p2, p3));

        var result = service.buscarPorNombre("mario");

        assertThat(result).extracting(Producto::getNombre)
                .containsExactly("MARIO kart");
    }

    @Test
    @DisplayName("buscarPorCategoria: filtra por ID de categoría")
    void buscarPorCategoria_ok() {
        when(repo.findAll()).thenReturn(List.of(p1, p2, p3));

        var result = service.buscarPorCategoria(1L);

        assertThat(result).allMatch(prod -> prod.getCategoria().getId().equals(1L));
    }

    @Test
    @DisplayName("desactivar: marca activo=false")
    void desactivar_ok() {
        p2.setId(20L);
        when(repo.findById(20L)).thenReturn(Optional.of(p2));
        when(repo.save(any(Producto.class))).thenAnswer(inv -> inv.getArgument(0));

        var result = service.desactivar(20L);

        assertThat(result.getActivo()).isFalse();
        verify(repo).save(p2);
    }
}
