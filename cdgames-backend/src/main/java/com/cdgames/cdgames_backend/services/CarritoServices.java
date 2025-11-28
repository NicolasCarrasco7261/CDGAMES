package com.cdgames.cdgames_backend.services;

import com.cdgames.cdgames_backend.entities.Carrito;
import com.cdgames.cdgames_backend.entities.ItemCarrito;
import com.cdgames.cdgames_backend.entities.Usuario;

import java.util.List;

public interface CarritoServices {

    Carrito obtenerOCrearCarrito(Usuario usuario);

    List<ItemCarrito> obtenerItemsCarrito(Usuario usuario);

    ItemCarrito agregarProducto(Usuario usuario, Long productoId, int cantidad);

    ItemCarrito actualizarCantidad(Usuario usuario, Long itemCarritoId, int nuevaCantidad);

    void eliminarItem(Usuario usuario, Long itemCarritoId);

    void vaciarCarrito(Usuario usuario);
}
