package com.cdgames.cdgames_backend.security;

import com.cdgames.cdgames_backend.entities.Usuario;
import com.cdgames.cdgames_backend.repositories.UsuarioRepositories;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UsuarioRepositories usuarioRepo;

    public CustomUserDetailsService(UsuarioRepositories usuarioRepo) {
        this.usuarioRepo = usuarioRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {

        // Aquí asumimos que el "username" que llega es el email
        Usuario usuario = usuarioRepo.findByEmail(usernameOrEmail)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + usernameOrEmail));

        var authorities = List.of(new SimpleGrantedAuthority("ROLE_" + usuario.getRol().name()));

        // Adapta esta línea según tu entidad (ej: getEstado(), isEnabled(), etc.)
        boolean enabled = usuario.getEstado().name().equalsIgnoreCase("ACTIVO");

        return new org.springframework.security.core.userdetails.User(
                usuario.getEmail(),     // identificador usado en el token
                usuario.getPassword(),  // contraseña ya encriptada con BCrypt
                enabled,
                true,
                true,
                true,
                authorities
        );
    }
}
