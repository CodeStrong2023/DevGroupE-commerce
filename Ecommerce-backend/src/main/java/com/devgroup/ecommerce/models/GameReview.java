package com.devgroup.ecommerce.models;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@Entity
@Table(name ="game_review")
public class GameReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne //Relacion muchos a uno ya que para un juego podemos tener varias reseñas
    @JoinColumn(name = "game_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE) //Si eliminamos un juego todas las resesñas del mismo se eliminaran también
    private Game game; // en gameReview establece que cada reseña pertenece a un único juego

    private String reviewText;

    @Column(nullable = false) // El campo rating debe contener un valor.
    private int rating; //almacena la calificación o valoración que podría estar entre un rango definido

    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")// cuando se inserte un nuevo registro, si no se especifica manualmente un valor para createdAt,
    // el valor predeterminado será la fecha y hora actuales
    private LocalDateTime createdAt; //representa la fecha y hora en que el objeto fue creado, junto con su zona horaria.

    @ManyToOne
    @JoinColumn(name = "guest_id")
    private User guest;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public String getReviewText() {
        return reviewText;
    }

    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}