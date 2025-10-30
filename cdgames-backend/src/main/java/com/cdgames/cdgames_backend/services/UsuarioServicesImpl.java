package com.cdgames.cdgames_backend.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.cdgames.cdgames_backend.entities.Usuario;
import com.cdgames.cdgames_backend.repositories.UsuarioRepositories;

@Service
@Transactional
public class UsuarioServicesImpl implements UsuarioServices {

    private final UsuarioRepositories usuarioRepositories;
    private final PasswordEncoder passwordEncoder; // interfaz, no la clase concreta

    // Inyección por constructor del repositorio y del bean global del encoder
    public UsuarioServicesImpl(UsuarioRepositories usuarioRepositories,
                               PasswordEncoder passwordEncoder) {
        this.usuarioRepositories = usuarioRepositories;
        this.passwordEncoder = passwordEncoder;
    }

    // ===== CRUD =====

    @Override
    public Usuario crear(Usuario usuario) {
        // Valida y encripta siempre al crear
        String raw = usuario.getPassword();
        if (raw == null || raw.isBlank()) {
            throw new IllegalArgumentException("La contraseña es obligatoria");
        }
        usuario.setPassword(passwordEncoder.encode(raw));

        // Defaults por si vienen null
        if (usuario.getEstado() == null) usuario.setEstado(Usuario.Estado.ACTIVO);
        if (usuario.getRol() == null) usuario.setRol(Usuario.Rol.CLIENTE);

        return usuarioRepositories.save(usuario);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Usuario> listarTodos() {
        return usuarioRepositories.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Usuario obtenerPorId(Long id) {
        return usuarioRepositories.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    @Override
    public Usuario actualizar(Long id, Usuario usuarioActualizado) {
        Usuario existente = obtenerPorId(id);

        existente.setNombre(usuarioActualizado.getNombre());
        existente.setEmail(usuarioActualizado.getEmail());

        // Re-encripta solo si viene password en texto plano
        if (usuarioActualizado.getPassword() != null && !usuarioActualizado.getPassword().isBlank()) {
            existente.setPassword(passwordEncoder.encode(usuarioActualizado.getPassword()));
        }

        if (usuarioActualizado.getRol() != null) {
            existente.setRol(usuarioActualizado.getRol());
        }

        // Estado se maneja en cambiarEstado(...)
        return usuarioRepositories.save(existente);
    }

    @Override
    public void eliminar(Long id) {
        if (!usuarioRepositories.existsById(id)) {
            throw new RuntimeException("Usuario no encontrado: " + id);
        }
        usuarioRepositories.deleteById(id);
    }

    // ===== Rúbrica =====

    @Override
    public Usuario cambiarEstado(Long id, Usuario.Estado nuevoEstado) {
        Usuario existente = obtenerPorId(id);
        existente.setEstado(nuevoEstado);
        return usuarioRepositories.save(existente);
    }

    @Override
    @Transactional(readOnly = true)
    public Usuario obtenerPorEmail(String email) {
        return usuarioRepositories.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con email: " + email));
    }
}