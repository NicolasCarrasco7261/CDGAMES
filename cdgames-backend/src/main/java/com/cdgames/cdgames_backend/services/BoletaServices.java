package com.cdgames.cdgames_backend.services;

import com.cdgames.cdgames_backend.entities.Boleta;
import com.cdgames.cdgames_backend.entities.Usuario;

import java.util.List;

public interface BoletaServices {

    Boleta generarBoletaDesdeCarrito(Usuario usuario);

    List<Boleta> listarBoletasCliente(Usuario cliente);

    List<Boleta> listarTodas();
}
