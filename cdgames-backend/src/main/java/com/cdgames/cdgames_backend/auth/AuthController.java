package com.cdgames.cdgames_backend.auth;

import com.cdgames.cdgames_backend.entities.Usuario;
import com.cdgames.cdgames_backend.repositories.UsuarioRepositories;
import com.cdgames.cdgames_backend.security.JwtUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UsuarioRepositories usuarioRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public AuthController(UsuarioRepositories usuarioRepo,
            PasswordEncoder passwordEncoder,
            JwtUtils jwtUtils) {
        this.usuarioRepo = usuarioRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest req) {

        // 1) Buscar usuario por email
        Usuario usuario = usuarioRepo.findByEmail(req.email())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "Credenciales inválidas"));

        // 2) Verificar contraseña con BCrypt
        if (!passwordEncoder.matches(req.password(), usuario.getPassword())) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Credenciales inválidas");
        }

        // 3) Verificar que esté ACTIVO
        if (usuario.getEstado() != Usuario.Estado.ACTIVO) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Usuario inactivo");
        }

        // 4) Generar JWT usando el email como sujeto
        String token = jwtUtils.generateToken(usuario.getEmail());

        return ResponseEntity.ok(new AuthResponse(token));
    }
}
