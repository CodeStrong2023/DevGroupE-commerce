package com.devgroup.ecommerce.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "games")
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    private String description;

    @ElementCollection
    private List<String> images;
    private LocalDate releaseDate;
    private BigDecimal price;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    @ManyToOne // Agregamos la anotación para la relación con Category
    @JoinColumn(name = "category_id", nullable = true) // Puede ser nullable ya que puede ser null si se elimina la categoría
    @OnDelete(action = OnDeleteAction.SET_NULL) // Se elimina la categoría pero los juegos se conservan
    private Category category; // Cada juego tiene una única categoría.
}
