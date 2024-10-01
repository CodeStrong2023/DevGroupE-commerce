package com.devgroup.ecommerce.controllers;

import com.devgroup.ecommerce.dto.GameDTO;
import com.devgroup.ecommerce.exceptions.GameNotFoundException;
import com.devgroup.ecommerce.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
                return new ResponseEntity<>(game, HttpStatus.OK); // Retornamos el juego si es encontrado
            } catch (GameNotFoundException e) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Si no es encontrado, retornamos 404
            }
        }

        // Crear un nuevo juego
        @PostMapping
        public ResponseEntity<GameDTO> createGame(@RequestBody GameDTO gameDTO) {
            GameDTO newGame = gameService.createGame(gameDTO);
            return new ResponseEntity<>(newGame, HttpStatus.CREATED); // Retornamos el juego creado con un 201
        }

        // Actualizar un juego existente
        @PutMapping("/{id}")
        public ResponseEntity<GameDTO> updateGame(@PathVariable Long id, @RequestBody GameDTO gameDTO) {
            try {
                GameDTO updatedGame = gameService.updateGame(id, gameDTO);
                return new ResponseEntity<>(updatedGame, HttpStatus.OK); // Retornamos el juego actualizado
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
}
