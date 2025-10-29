package com.cdgames.cdgames_backend.controllers;

import com.cdgames.cdgames_backend.entities.Usuario;
import com.cdgames.cdgames_backend.services.UsuarioServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

// Swagger / OpenAPI
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/usuarios")
@Tag(name = "Usuarios", description = "Gestión de usuarios del sistema (administrador y empleados)")
public class UsuarioRestControllers {

    @Autowired
    private UsuarioServices usuarioServices;

    @Operation(summary = "Crear un nuevo usuario")
    @PostMapping
    public ResponseEntity<Usuario> crear(@RequestBody Usuario usuario) {
        return ResponseEntity.ok(usuarioServices.crear(usuario));
    }

    @Operation(summary = "Listar todos los usuarios registrados")
    @GetMapping
    public ResponseEntity<List<Usuario>> listarTodos() {
        return ResponseEntity.ok(usuarioServices.listarTodos());
    }

    @Operation(summary = "Obtener un usuario por su ID")
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(usuarioServices.obtenerPorId(id));
    }

    @Operation(summary = "Actualizar los datos de un usuario existente")
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizar(@PathVariable Long id, @RequestBody Usuario usuarioActualizado) {
        return ResponseEntity.ok(usuarioServices.actualizar(id, usuarioActualizado));
    }

    @Operation(summary = "Eliminar un usuario por su ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        usuarioServices.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Cambiar el estado de un usuario (ACTIVO / INACTIVO)")
    @PatchMapping("/{id}/estado")
    public ResponseEntity<Usuario> cambiarEstado(@PathVariable Long id, @RequestParam Usuario.Estado estado) {
        return ResponseEntity.ok(usuarioServices.cambiarEstado(id, estado));
    }
}