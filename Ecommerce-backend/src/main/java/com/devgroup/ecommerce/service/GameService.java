package com.devgroup.ecommerce.service;

import com.devgroup.ecommerce.dto.GameDTO;
import com.devgroup.ecommerce.models.Game;
import com.devgroup.ecommerce.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

// LA CLASE GameService gestiona la lógica y transforma los objetos Game a GameDTO y viceversa.

@Service //Indicamos que es nuestra clase service
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    //Método para convertir ENTITY GAME a DTO
    private GameDTO convertToDTO(Game game){
        GameDTO gameDto1 = new GameDTO();
        gameDto1.setTitle(game.getTitle());
        gameDto1.setId(game.getId());
        gameDto1.setDescription(game.getDescription());
        gameDto1.setReleaseDate(game.getReleaseDate());
        return gameDto1;
    }

    //Método para convertir de GameDTO a ENTITY
    private Game convertToEntity(GameDTO gameDTO){
        Game gameEntity = new Game();
        gameEntity.setTitle(gameDTO.getTitle());
        gameEntity.setDescription(gameDTO.getDescription());
        gameEntity.setId(gameDTO.getId());
        gameEntity.setReleaseDate(gameDTO.getReleaseDate());
        return gameEntity;
    }

    //Método donde vamos a obtener todos los juegos y convertirlos a DTO
    public List<GameDTO> getAllGames(){
        List<Game> games = gameRepository.findAll();
        return games.stream()
                .map(game -> new GameDTO(game.getId(), game.getTitle(), game.getDescription(), game.getReleaseDate(), game.getPrice()))
                .collect(Collectors.toList());

    }

    public GameDTO createGame(GameDTO gameDTO) {
        // Convertimos el DTO a entidad
        Game gameEntity = convertToEntity(gameDTO);
        // Guardamos la nueva entidad en la base de datos
        Game savedGame = gameRepository.save(gameEntity);
        // Retornamos el DTO de la entidad guardada
        return convertToDTO(savedGame);
    }
    public List<GameDTO> findAll() {
        // Obtenemos la lista de juegos desde la base de datos
        List<Game> games = gameRepository.findAll();
        // Convertimos cada entidad Game a su  DTO
        return games.stream().map(this::convertToDTO).collect(Collectors.toList());
    }
    public GameDTO findById(Long id) {
        // Buscamos la entidad por su ID
        Game game = gameRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Game not found"));
        // Convertimos la entidad a DTO y la retornamos
        return convertToDTO(game);
    }
    public GameDTO updateGame(Long id, GameDTO gameDTO) {
        // Buscar el juego existente por ID
        Game existingGame = gameRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Game not found"));
        // Actualizamos los campos con los datos del DTO
        existingGame.setTitle(gameDTO.getTitle());
        existingGame.setDescription(gameDTO.getDescription());
        existingGame.setReleaseDate(gameDTO.getReleaseDate());
        // Guardamos la entidad actualizada en la base de datos
        Game updatedGame = gameRepository.save(existingGame);
        // Retornamos el DTO de la entidad actualizada
        return convertToDTO(updatedGame);
    }
    public void deleteGame(Long id) {
        // Buscamos el juego por ID y lo eliminamos
        Game existingGame = gameRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Game not found"));
        // Eliminamos el juego de la base de datos
        gameRepository.delete(existingGame);
    }
}
