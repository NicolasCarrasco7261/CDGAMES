package com.cdgames.cdgames_backend.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(
    name = "producto",
    uniqueConstraints = @UniqueConstraint(columnNames = "codigo")
)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Código único del producto visible en la interfaz */
    @NotBlank
    @Size(min = 3, max = 30)
    @Column(nullable = false, length = 30, unique = true)
    private String codigo;

    /** Nombre del producto */
    @NotBlank
    @Size(max = 100)
    @Column(nullable = false, length = 100)
    private String nombre;

    /** Descripción opcional */
    @Size(max = 500)
    private String descripcion;

    /** Precio en pesos chilenos (entero) */
    @NotNull
    @PositiveOrZero
    @Column(nullable = false)
    private Integer precio;

    /** Stock actual (cantidad disponible) */
    @NotNull
    @Min(0)
    @Column(nullable = false)
    private Integer stock = 0;

    /** Opcional: valor de referencia para alertas de stock crítico */
    @Min(0)
    private Integer stockCritico;

    /** URL de la imagen del producto (solo guardamos el enlace) */
    @Size(max = 1024)
    @Column(name = "imagen_url", length = 1024)
    private String imagenUrl;

    /** Relación obligatoria con la categoría (EAGER para simplificar el frontend) */
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "categoria_id", nullable = false)
    private Categoria categoria;

    /** Estado lógico del producto */
    @NotNull
    @Column(nullable = false)
    private Boolean activo = true;

    /** Fecha de creación del registro (automática del sistema) */
    @CreationTimestamp
    @Column(name = "fecha_creacion", nullable = false, updatable = false)
    private LocalDateTime fechaCreacion;
}