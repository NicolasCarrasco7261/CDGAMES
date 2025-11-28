package com.cdgames.cdgames_backend.controllers;

import com.cdgames.cdgames_backend.entities.ItemCarrito;
import com.cdgames.cdgames_backend.entities.Usuario;
import com.cdgames.cdgames_backend.repositories.UsuarioRepositories;
import com.cdgames.cdgames_backend.services.CarritoServices;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Swagger / OpenAPI
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/carrito")
@PreAuthorize("hasRole('CLIENTE')")
@Tag(name = "Carrito", description = "Operaciones para gestionar el carrito del cliente")
public class CarritoRestController {

    private final CarritoServices carritoServices;
    private final UsuarioRepositories usuarioRepo;

    public CarritoRestController(CarritoServices carritoServices,
            UsuarioRepositories usuarioRepo) {
        this.carritoServices = carritoServices;
        this.usuarioRepo = usuarioRepo;
    }

    @Operation(summary = "Obtener los items del carrito del usuario autenticado")
    @GetMapping
    public List<ItemCarrito> obtenerCarrito(Authentication auth) {
        Usuario usuario = getUsuarioActual(auth);
        return carritoServices.obtenerItemsCarrito(usuario);
    }

    @Operation(summary = "Agregar producto al carrito")
    @PostMapping("/items/{productoId}")
    public ItemCarrito agregarItem(Authentication auth,
            @PathVariable Long productoId,
            @RequestParam int cantidad) {
        Usuario usuario = getUsuarioActual(auth);
        return carritoServices.agregarProducto(usuario, productoId, cantidad);
    }

    @Operation(summary = "Actualizar la cantidad de un ítem del carrito")
    @PutMapping("/items/{itemId}")
    public ItemCarrito actualizarCantidad(Authentication auth,
            @PathVariable Long itemId,
            @RequestParam int cantidad) {
        Usuario usuario = getUsuarioActual(auth);
        return carritoServices.actualizarCantidad(usuario, itemId, cantidad);
    }

    @Operation(summary = "Eliminar un ítem del carrito")
    @DeleteMapping("/items/{itemId}")
    public void eliminarItem(Authentication auth, @PathVariable Long itemId) {
        Usuario usuario = getUsuarioActual(auth);
        carritoServices.eliminarItem(usuario, itemId);
    }

    @Operation(summary = "Vaciar por completo el carrito del usuario")
    @DeleteMapping
    public void vaciarCarrito(Authentication auth) {
        Usuario usuario = getUsuarioActual(auth);
        carritoServices.vaciarCarrito(usuario);
    }

    // MÉTODO AUXILIAR

    private Usuario getUsuarioActual(Authentication auth) {
        String email = auth.getName(); // viene del JWT (username=email)
        return usuarioRepo.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado: " + email));
    }
}
