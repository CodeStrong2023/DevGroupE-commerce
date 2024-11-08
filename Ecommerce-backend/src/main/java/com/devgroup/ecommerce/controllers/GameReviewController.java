package com.devgroup.ecommerce.controllers;

import com.devgroup.ecommerce.dto.GameReviewDTO;
import com.devgroup.ecommerce.service.GameReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/gameReview")
public class GameReviewController {
    @Autowired
    private GameReviewService gameReviewService;

    // Obtener todas las reviews (GET)
    @GetMapping
    public ResponseEntity<List<GameReviewDTO>> getAllReviews() {
        List<GameReviewDTO> reviews = gameReviewService.findAllReviews();
        return new ResponseEntity<>(reviews, HttpStatus.OK); // 200 OK
    }

    // Obtener una review por ID (GET)
    @GetMapping("/{id}")
    public ResponseEntity<GameReviewDTO> getReviewById(@PathVariable Long id) {
        GameReviewDTO review = gameReviewService.findReviewById(id);
        return new ResponseEntity<>(review, HttpStatus.OK); // 200 OK
    }

    // Crear una nueva review (POST)
    @PostMapping
    public ResponseEntity<GameReviewDTO> createReview(@RequestBody GameReviewDTO reviewDTO) {
        GameReviewDTO newReview = gameReviewService.createGameReview(reviewDTO);
        return new ResponseEntity<>(newReview, HttpStatus.CREATED); // 201 Created
    }

    // Actualizar una review existente (PUT)
    @PutMapping("/{id}")
    public ResponseEntity<GameReviewDTO> updateReview(@PathVariable Long id, @RequestBody GameReviewDTO reviewDTO) {
        GameReviewDTO updatedReview = gameReviewService.updateGameReview(id, reviewDTO);
        return new ResponseEntity<>(updatedReview, HttpStatus.OK); // 200 OK
    }

    // Eliminar una review por ID (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        gameReviewService.deleteGameReview(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content
    }
}
