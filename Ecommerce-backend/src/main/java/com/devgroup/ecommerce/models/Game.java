package com.devgroup.ecommerce.models;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;

@Entity
@Table(name = "games")
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    private String description;

    private LocalDate releaseDate;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    @ManyToOne // Agregamos la anotación para la relación con Category
    @JoinColumn(name = "category_id", nullable = true) // Puede ser nullable ya que puede ser null si se elimina la categoría
    @OnDelete(action = OnDeleteAction.SET_NULL) // Se elimina la categoría pero los juegos se conservan
    private Category category; // Cada juego tiene una única categoría.

    // Getters y Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
