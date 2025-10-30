package com.cdgames.cdgames_backend.controllers;

import com.cdgames.cdgames_backend.entities.Usuario;
import com.cdgames.cdgames_backend.services.UsuarioServices;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

// Swagger / OpenAPI
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
@Tag(name = "Autenticación", description = "Login básico de usuarios sin JWT")
public class AuthController {

    private final UsuarioServices usuarioServices;
    private final BCryptPasswordEncoder passwordEncoder;

    // Inyección por constructor del Service y del bean global del encoder
    public AuthController(UsuarioServices usuarioServices,
                          BCryptPasswordEncoder passwordEncoder) {
        this.usuarioServices = usuarioServices;
        this.passwordEncoder = passwordEncoder;
    }

    // DTO mínimo para recibir credenciales (email + password)
    @Schema(description = "Credenciales de inicio de sesión")
    public static class LoginRequest {
        public String email;
        public String password;
    }

    @Operation(summary = "Iniciar sesión con email y contraseña")
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody(description = "Credenciales de acceso")
            @org.springframework.web.bind.annotation.RequestBody LoginRequest request) {

        try {
            // 1) Buscar usuario por email
            Usuario usuario = usuarioServices.obtenerPorEmail(request.email);

            // 2) Verificar estado ACTIVO
            if (usuario.getEstado() != Usuario.Estado.ACTIVO) {
                return ResponseEntity.status(403).body("Usuario inactivo");
            }

            // 3) Validar contraseña con BCrypt (comparar texto plano vs. hash)
            if (!passwordEncoder.matches(request.password, usuario.getPassword())) {
                return ResponseEntity.status(401).body("Credenciales inválidas");
            }

            // 4) No exponer la contraseña
            usuario.setPassword(null);

            // 5) Devolver datos del usuario autenticado (sin JWT en esta etapa)
            return ResponseEntity.ok(usuario);

        } catch (RuntimeException e) {
            // Usuario no encontrado u otro error controlado
            return ResponseEntity.status(401).body("Credenciales inválidas");
        }
    }
}
