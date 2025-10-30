package com.cdgames.cdgames_backend.service;

import com.cdgames.cdgames_backend.entities.Usuario;
import com.cdgames.cdgames_backend.repositories.UsuarioRepositories;
import com.cdgames.cdgames_backend.services.UsuarioServicesImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class UsuarioServiceImplTest {

    @Mock
    private UsuarioRepositories usuarioRepositories;

    // Usamos la interfaz + un encoder real para que encode/matches funcionen
    @Spy
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Inyección por constructor con los @Mock/@Spy de arriba
    @InjectMocks
    private UsuarioServicesImpl usuarioService;

    @BeforeEach
    void init() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @DisplayName("listarTodos: debe retornar los usuarios del repositorio")
    void listarTodos_ok() {
        var u1 = new Usuario(); u1.setId(1L); u1.setNombre("Ana");
        var u2 = new Usuario(); u2.setId(2L); u2.setNombre("Benja");
        when(usuarioRepositories.findAll()).thenReturn(List.of(u1, u2));

        var result = usuarioService.listarTodos();

        assertThat(result).hasSize(2);
        verify(usuarioRepositories, times(1)).findAll();
    }

    @Test
    @DisplayName("obtenerPorId: debe retornar el usuario cuando existe")
    void obtenerPorId_ok() {
        var u = new Usuario(); u.setId(10L); u.setNombre("Admin");
        when(usuarioRepositories.findById(10L)).thenReturn(Optional.of(u));

        var result = usuarioService.obtenerPorId(10L);

        assertEquals(10L, result.getId());
        assertEquals("Admin", result.getNombre());
        verify(usuarioRepositories).findById(10L);
    }

    @Test
    @DisplayName("crear: encripta la contraseña y asigna defaults")
    void crear_encriptaPassword() {
        var nuevo = new Usuario();
        nuevo.setNombre("Carla");
        nuevo.setEmail("carla@demo.cl");
        nuevo.setPassword("secreto");

        when(usuarioRepositories.save(any(Usuario.class))).thenAnswer(inv -> inv.getArgument(0));

        var guardado = usuarioService.crear(nuevo);

        assertNotNull(guardado.getPassword());
        assertNotEquals("secreto", guardado.getPassword());
        // verificamos con el mismo encoder del servicio (spy)
        assertTrue(passwordEncoder.matches("secreto", guardado.getPassword()));
        assertNotNull(guardado.getEstado());
        assertNotNull(guardado.getRol());
        verify(usuarioRepositories).save(any(Usuario.class));
    }

    @Test
    @DisplayName("cambiarEstado: pasa de ACTIVO a INACTIVO")
    void cambiarEstado_ok() {
        var u = new Usuario();
        u.setId(7L);
        u.setEstado(Usuario.Estado.ACTIVO);

        when(usuarioRepositories.findById(7L)).thenReturn(Optional.of(u));
        when(usuarioRepositories.save(any(Usuario.class))).thenAnswer(inv -> inv.getArgument(0));

        var result = usuarioService.cambiarEstado(7L, Usuario.Estado.INACTIVO);

        assertEquals(Usuario.Estado.INACTIVO, result.getEstado());
        verify(usuarioRepositories).save(u);
    }
}
