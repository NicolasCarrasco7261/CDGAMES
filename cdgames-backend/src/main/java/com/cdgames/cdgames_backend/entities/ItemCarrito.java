package com.cdgames.cdgames_backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "items_carrito")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemCarrito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Un ítem pertenece a un carrito
    @ManyToOne(optional = false)
    @JoinColumn(name = "carrito_id", nullable = false)
    @JsonIgnore   //evita el ciclo infinito al serializar
    private Carrito carrito;

    // Producto agregado al carrito
    @ManyToOne(optional = false)
    @JoinColumn(name = "producto_id", nullable = false)
    private Producto producto;

    // Cantidad solicitada
    @Column(nullable = false)
    private int cantidad;

    // Precio unitario del producto en pesos chilenos
    @Column(nullable = false)
    private int precioUnitario;

    // subtotal = cantidad * precioUnitario
    @Column(nullable = false)
    private int subtotal;
}
