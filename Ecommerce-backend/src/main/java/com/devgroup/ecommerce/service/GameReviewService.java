package com.devgroup.ecommerce.service;
import com.devgroup.ecommerce.dto.GameReviewDTO;
import com.devgroup.ecommerce.models.GameReview;
import com.devgroup.ecommerce.repository.GameReviewRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GameReviewService {
    private GameReviewRepository gameReviewRepository;

    //Método para convertir ENTITY GAMEREVIEW a DTO
    private GameReviewDTO convertToDTO(GameReview gameReview) {
        GameReviewDTO gameRevDto1 = new GameReviewDTO();
        gameRevDto1.setId(gameReview.getId());
        gameRevDto1.setGame(gameReview.getGame());
        gameRevDto1.setReviewText(gameReview.getReviewText());
        gameRevDto1.setRating(gameReview.getRating());
        gameRevDto1.setCreatedAt(gameReview.getCreatedAt());
        return gameRevDto1;
    }

    //Método para convertir de GameReviewDTO a ENTITY
    private GameReview convertToEntity(GameReviewDTO gameReviewDTO) {
        GameReview gameReview1 = new GameReview();
        gameReview1.setId(gameReviewDTO.getId());
        gameReview1.setGame(gameReviewDTO.getGame());
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
        // Guardar la entidad actualizada en la base de datos
        GameReview updatedReview = gameReviewRepository.save(existingReview);
        // Retornar el DTO de la entidad actualizada
        return convertToDTO(updatedReview);
    }

    // Delete (Eliminar una reseña)
    public void deleteGameReview(Long id) {
        gameReviewRepository.deleteById(id);
    }
}
