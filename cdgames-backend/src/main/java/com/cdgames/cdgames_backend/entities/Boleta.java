package com.cdgames.cdgames_backend.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "boletas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Boleta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Número de la boleta 
    @Column(nullable = false, unique = true, length = 50)
    private String numero;

    // Cliente que realizó la compra
    @ManyToOne(optional = false)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario cliente;

    // Fecha y hora de emisión
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime fechaEmision;

    // Monto neto (sin IVA) en pesos chilenos
    @Column(nullable = false)
    private int neto;

    // Monto de IVA en pesos chilenos
    @Column(nullable = false)
    private int iva;

    // Total (neto + IVA) en pesos chilenos
    @Column(nullable = false)
    private int total;

    // Detalles de la boleta (líneas de productos)
    @OneToMany(mappedBy = "boleta", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DetalleBoleta> detalles = new ArrayList<>();
}
