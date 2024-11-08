package com.devgroup.ecommerce.controllers;

import com.devgroup.ecommerce.dto.GameDTO;
import com.devgroup.ecommerce.exceptions.GameNotFoundException;
import com.devgroup.ecommerce.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

    // LA CLASE GameController expone los endpoints para interactuar con los juegos.
@RestController
@RequestMapping("/games")
public class GamesController {
        @Autowired
        private GameService gameService; // Inyectamos el servicio de Game

        // Obtener todos los juegos
        @GetMapping
        public List<GameDTO> getAllGames() {
            return gameService.findAll(); // Llamamos al método de servicio para obtener todos los juegos
        }

        // Obtener un juego por su ID
        @GetMapping("/{id}")
        public ResponseEntity<GameDTO> getGameById(@PathVariable Long id) {
            try {
                GameDTO game = gameService.findById(id);
                return ResponseEntity.ok(game); // Retornamos el juego si es encontrado
            } catch (GameNotFoundException e) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Si no es encontrado, retornamos 404
            }
        }

        // Crear un nuevo juego

        @PostMapping(consumes = "multipart/form-data")
        public ResponseEntity<GameDTO> createGame(
                @RequestParam String title,
                @RequestParam String description,
                @RequestParam Integer ownerId,
                @RequestParam List<String> images,
                @RequestParam LocalDate releaseDate,
                @RequestParam BigDecimal price,
                @RequestParam Long categoryId) {
            GameDTO gameDTO = new GameDTO(title, description, ownerId, images, releaseDate, price, categoryId);
            GameDTO newGame = gameService.createGame(gameDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(newGame);
        }

        // Actualizar un juego existente
        @PutMapping("/{id}")
        public ResponseEntity<GameDTO> updateGame(@PathVariable Long id, @RequestBody GameDTO gameDTO) {
            try {
                GameDTO updatedGame = gameService.updateGame(id, gameDTO);
                return ResponseEntity.ok(updatedGame); // Retornamos el juego actualizado
            } catch (GameNotFoundException e) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Retornamos 404 si el juego no existe
            }
        }

        // Eliminar un juego por su ID
        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteGame(@PathVariable Long id) {
            try {
                gameService.deleteGame(id);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT); // Retornamos 204 si la eliminación fue exitosa
            } catch (GameNotFoundException e) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Retornamos 404 si no existe el juego
            }
        }

        @GetMapping("/category/{categoryId}") // Endpoint para obtener los juegos por id de categoría
        public List<GameDTO> getGamesByCategoryId(@PathVariable Long categoryId) {
            return gameService.getElementByCategoryId(categoryId);
        }
}
