package com.cdgames.cdgames_backend.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "usuarios", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
@Data @NoArgsConstructor @AllArgsConstructor
public class Usuario {
    
    public enum Rol { CLIENTE, VENDEDOR, ADMINISTRADOR }
    public enum Estado { ACTIVO, INACTIVO }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 100)
    @Column(nullable = false, length = 100)
    private String nombre;

    @NotBlank
    @Email
    @Size(max = 100)
    @Column(nullable = false, length = 100, unique = true)
    private String email;

    // Se encripta con BCrypt en el Service
    @NotBlank
    @Size(min = 8, max = 120)
    @Column(nullable = false, length = 120)
    private String password;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Rol rol = Rol.CLIENTE;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Estado estado = Estado.ACTIVO;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
}
