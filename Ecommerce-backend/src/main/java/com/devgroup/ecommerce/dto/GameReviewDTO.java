package com.devgroup.ecommerce.dto;

import com.devgroup.ecommerce.models.Game;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GameReviewDTO {
    private Long id;
    private Game game;
    private String reviewText;
    private int rating;
    private LocalDateTime createdAt;
}
