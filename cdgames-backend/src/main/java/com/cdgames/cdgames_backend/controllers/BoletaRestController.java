package com.cdgames.cdgames_backend.controllers;

import com.cdgames.cdgames_backend.entities.Boleta;
import com.cdgames.cdgames_backend.entities.Usuario;
import com.cdgames.cdgames_backend.repositories.UsuarioRepositories;
import com.cdgames.cdgames_backend.services.BoletaServices;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

// Swagger / OpenAPI
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/boletas")
@Tag(name = "Boletas", description = "Emisión e historial de boletas")
public class BoletaRestController {

    private final BoletaServices boletaServices;
    private final UsuarioRepositories usuarioRepo;

    public BoletaRestController(BoletaServices boletaServices,
            UsuarioRepositories usuarioRepo) {
        this.boletaServices = boletaServices;
        this.usuarioRepo = usuarioRepo;
    }

    @Operation(summary = "Generar boleta desde el carrito del cliente autenticado")
    @PostMapping
    @PreAuthorize("hasRole('CLIENTE')")
    public ResponseEntity<Boleta> generarBoleta(Authentication auth) {
        Usuario usuario = getUsuarioActual(auth);
        Boleta boleta = boletaServices.generarBoletaDesdeCarrito(usuario);
        return ResponseEntity.ok(boleta);
    }

    @Operation(summary = "Listar boletas del cliente autenticado (historial de compras)")
    @GetMapping("/cliente")
    @PreAuthorize("hasRole('CLIENTE')")
    public ResponseEntity<List<Boleta>> listarMisBoletas(Authentication auth) {
        Usuario usuario = getUsuarioActual(auth);
        List<Boleta> boletas = boletaServices.listarBoletasCliente(usuario);
        return ResponseEntity.ok(boletas);
    }

    @Operation(summary = "Listar todas las boletas (solo administrador)")
    @GetMapping
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<List<Boleta>> listarTodas() {
        List<Boleta> boletas = boletaServices.listarTodas();
        return ResponseEntity.ok(boletas);
    }

    // Método auxiliar

    private Usuario getUsuarioActual(Authentication auth) {
        String email = auth.getName(); // viene del JWT (username = email)
        return usuarioRepo.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado: " + email));
    }
}
