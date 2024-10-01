package com.devgroup.ecommerce.dto;

import com.devgroup.ecommerce.models.Game;

import java.time.LocalDateTime;

public class GameReviewDTO {
    private Long id;
    private Game game;
    private String reviewText;
    private int rating;
    private LocalDateTime createdAt;

    public GameReviewDTO() {
    }

    public GameReviewDTO(Long id, Game game, String reviewText, int rating, LocalDateTime createdAt) {
        this.id = id;
        this.game = game;
        this.reviewText = reviewText;
        this.rating = rating;
        this.createdAt = createdAt;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
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
