package com.cdgames.cdgames_backend.services;

import com.cdgames.cdgames_backend.entities.*;
import com.cdgames.cdgames_backend.repositories.CarritoRepositories;
import com.cdgames.cdgames_backend.repositories.ItemCarritoRepositories;
import com.cdgames.cdgames_backend.repositories.ProductoRepositories;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CarritoServicesImpl implements CarritoServices {

    private final CarritoRepositories carritoRepo;
    private final ItemCarritoRepositories itemCarritoRepo;
    private final ProductoRepositories productoRepo;

    public CarritoServicesImpl(CarritoRepositories carritoRepo,
            ItemCarritoRepositories itemCarritoRepo,
            ProductoRepositories productoRepo) {
        this.carritoRepo = carritoRepo;
        this.itemCarritoRepo = itemCarritoRepo;
        this.productoRepo = productoRepo;
    }

    @Override
    public Carrito obtenerOCrearCarrito(Usuario usuario) {
        return carritoRepo.findByUsuario(usuario)
                .orElseGet(() -> {
                    Carrito nuevo = new Carrito();
                    nuevo.setUsuario(usuario);
                    return carritoRepo.save(nuevo);
                });
    }

    @Override
    public List<ItemCarrito> obtenerItemsCarrito(Usuario usuario) {
        Carrito carrito = obtenerOCrearCarrito(usuario);
        return itemCarritoRepo.findByCarrito(carrito);
    }

    @Override
    public ItemCarrito agregarProducto(Usuario usuario, Long productoId, int cantidad) {
        if (cantidad <= 0) {
            throw new IllegalArgumentException("La cantidad debe ser mayor que cero.");
        }

        Carrito carrito = obtenerOCrearCarrito(usuario);

        Producto producto = productoRepo.findById(productoId)
                .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado: " + productoId));

        // Verificar si el producto ya está en el carrito
        List<ItemCarrito> items = itemCarritoRepo.findByCarrito(carrito);

        ItemCarrito existente = items.stream()
                .filter(i -> i.getProducto().getId().equals(producto.getId()))
                .findFirst()
                .orElse(null);

        int precioUnitario = producto.getPrecio(); // ajusta si tu campo tiene otro nombre

        if (existente != null) {
            int nuevaCantidad = existente.getCantidad() + cantidad;
            existente.setCantidad(nuevaCantidad);
            existente.setSubtotal(nuevaCantidad * precioUnitario);
            return itemCarritoRepo.save(existente);
        } else {
            ItemCarrito item = new ItemCarrito();
            item.setCarrito(carrito);
            item.setProducto(producto);
            item.setCantidad(cantidad);
            item.setPrecioUnitario(precioUnitario);
            item.setSubtotal(cantidad * precioUnitario);
            return itemCarritoRepo.save(item);
        }
    }

    @Override
    public ItemCarrito actualizarCantidad(Usuario usuario, Long itemCarritoId, int nuevaCantidad) {
        if (nuevaCantidad <= 0) {
            throw new IllegalArgumentException("La cantidad debe ser mayor que cero.");
        }

        Carrito carrito = obtenerOCrearCarrito(usuario);

        ItemCarrito item = itemCarritoRepo.findById(itemCarritoId)
                .orElseThrow(() -> new EntityNotFoundException("Item de carrito no encontrado: " + itemCarritoId));

        if (!item.getCarrito().getId().equals(carrito.getId())) {
            throw new IllegalStateException("El item no pertenece al carrito del usuario.");
        }

        int precioUnitario = item.getPrecioUnitario();
        item.setCantidad(nuevaCantidad);
        item.setSubtotal(nuevaCantidad * precioUnitario);

        return itemCarritoRepo.save(item);
    }

    @Override
    public void eliminarItem(Usuario usuario, Long itemCarritoId) {
        Carrito carrito = obtenerOCrearCarrito(usuario);

        ItemCarrito item = itemCarritoRepo.findById(itemCarritoId)
                .orElseThrow(() -> new EntityNotFoundException("Item de carrito no encontrado: " + itemCarritoId));

        if (!item.getCarrito().getId().equals(carrito.getId())) {
            throw new IllegalStateException("El item no pertenece al carrito del usuario.");
        }

        itemCarritoRepo.delete(item);
    }

    @Override
    public void vaciarCarrito(Usuario usuario) {
        Carrito carrito = obtenerOCrearCarrito(usuario);
        List<ItemCarrito> items = itemCarritoRepo.findByCarrito(carrito);
        itemCarritoRepo.deleteAll(items);
    }
}
