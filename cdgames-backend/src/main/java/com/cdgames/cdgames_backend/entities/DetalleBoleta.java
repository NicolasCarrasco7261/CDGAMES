package com.cdgames.cdgames_backend.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "detalles_boleta")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetalleBoleta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Boleta a la que pertenece este detalle
    @ManyToOne(optional = false)
    @JoinColumn(name = "boleta_id", nullable = false)
    private Boleta boleta;

    // Producto vendido en esta línea
    @ManyToOne(optional = false)
    @JoinColumn(name = "producto_id", nullable = false)
    private Producto producto;

    // Cantidad del producto
    @Column(nullable = false)
    private int cantidad;

    // Precio unitario en pesos chilenos al momento de la compra
    @Column(nullable = false)
    private int precioUnitario;

    // subtotal = cantidad * precioUnitario
    @Column(nullable = false)
    private int subtotal;
}
