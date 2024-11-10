package com.devgroup.ecommerce.service;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.devgroup.ecommerce.dto.GameReviewDTO;
import com.devgroup.ecommerce.models.Game;
import com.devgroup.ecommerce.models.GameReview;
import com.devgroup.ecommerce.repository.GameRepository;
import com.devgroup.ecommerce.repository.GameReviewRepository;

@Service
public class GameReviewService {
    @Autowired
    private GameReviewRepository gameReviewRepository;

    @Autowired
    private GameRepository gameRepository;

    // Inyectar la clave secreta desde el archivo de configuración
    @Value("${jwt.secret}")
    private String secretKeyString;

// Método para convertir ENTITY GAMEREVIEW a DTO
private GameReviewDTO convertToDTO(GameReview gameReview) {
    GameReviewDTO gameRevDto1 = new GameReviewDTO();
    gameRevDto1.setId(gameReview.getId());

    // No es necesario hacer otra consulta si ya tenemos el objeto "Game" en la entidad
    if (gameReview.getGame() != null) {
        gameRevDto1.setGame(gameReview.getGame());
    }

    gameRevDto1.setReviewText(gameReview.getReviewText());
    gameRevDto1.setRating(gameReview.getRating());
    gameRevDto1.setCreatedAt(gameReview.getCreatedAt());
    
    return gameRevDto1;
}

// Método para convertir de GameReviewDTO a ENTITY
private GameReview convertToEntity(GameReviewDTO gameReviewDTO) {
    GameReview gameReview1 = new GameReview();

    gameReview1.setId(gameReviewDTO.getId());

    // Buscar el Game en la base de datos para asegurarnos de que es válido
    if (gameReviewDTO.getGame() != null && gameReviewDTO.getGame().getId() != null) {
        Game game = gameRepository.findById(gameReviewDTO.getGame().getId())
                .orElseThrow(() -> new RuntimeException("Game not found"));
        gameReview1.setGame(game);
    } else {
        throw new RuntimeException("Game information is missing or invalid");
    }

    gameReview1.setReviewText(gameReviewDTO.getReviewText());
    gameReview1.setRating(gameReviewDTO.getRating());
    gameReview1.setCreatedAt(gameReviewDTO.getCreatedAt());
    
    return gameReview1;
}

    public GameReviewDTO createGameReview(GameReviewDTO gameReviewDTO) {
        GameReview newReview = convertToEntity(gameReviewDTO);
        GameReview savedReview = gameReviewRepository.save(newReview);
        return convertToDTO(savedReview);
    }

    public List<GameReviewDTO> findAllReviews() {
        List<GameReview> reviews = gameReviewRepository.findAll();
        return reviews.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public GameReviewDTO findReviewById(Long id) {
        GameReview review = gameReviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found"));
        return convertToDTO(review);
    }

    // Update (Actualizar una reseña existente)
    public GameReviewDTO updateGameReview(Long id, GameReviewDTO gameReviewDTO) {
        GameReview existingReview = gameReviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found"));
        // Actualizamos los valores de la entidad existente con los datos del DTO
        existingReview.setReviewText(gameReviewDTO.getReviewText());
        existingReview.setRating(gameReviewDTO.getRating());
        existingReview.setGame(gameReviewDTO.getGame());
        // Guardamos la entidad actualizada en la base de datos
        GameReview updatedReview = gameReviewRepository.save(existingReview);
        // Retornar el DTO de la entidad actualizada
        return convertToDTO(updatedReview);
    }

    // Delete (Eliminar una reseña)
    public void deleteGameReview(Long id) {
        gameReviewRepository.deleteById(id);
    }
}
