package com.cdgames.cdgames_backend.services;

import com.cdgames.cdgames_backend.entities.Usuario;
import java.util.List;
public interface UsuarioServices {
    // Crear un nuevo usuarios
    Usuario crear(Usuario usuario);

    // Listar todos los usuarios
    List<Usuario> listarTodos();

    // Obtener un usuario por su ID
    Usuario obtenerPorId(Long id);

    // Actualizar un usuario existente
    Usuario actualizar(Long id, Usuario usuarioActualizado);

    // Eliminar un usuario por su ID
    void eliminar(Long id);

    // Métodos según la rúbrica para usuarios

    // Cambiar estado (ACTIVO / INACTIVO)
    Usuario cambiarEstado(Long id, Usuario.Estado nuevoEstado);

    // Soporte para login (AuthController usará esto)
    Usuario obtenerPorEmail(String email);
}
