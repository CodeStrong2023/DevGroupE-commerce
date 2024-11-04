package com.devgroup.ecommerce.service;

import com.devgroup.ecommerce.dto.GameDTO;
import com.devgroup.ecommerce.models.Category;
import com.devgroup.ecommerce.models.Game;
import com.devgroup.ecommerce.models.User;
import com.devgroup.ecommerce.repository.CategoryRepository;
import com.devgroup.ecommerce.repository.GameRepository;
import com.devgroup.ecommerce.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

// LA CLASE GameService gestiona la lógica y transforma los objetos Game a GameDTO y viceversa.

@Service //Indicamos que es nuestra clase service
public class GameService {

    @Autowired
    private GameRepository gameRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired 
    private CategoryRepository categoryRepository;

    //Método para convertir ENTITY GAME a DTO
    private GameDTO convertToDTO(Game game) {
        System.out.println("Convirtiendo a DTO: " + game);
        GameDTO gameDto = new GameDTO();
        gameDto.setId(game.getId());
        gameDto.setTitle(game.getTitle());
        gameDto.setOwnerId(game.getOwner() != null ? game.getOwner().getId() : null);
        gameDto.setCategoryId(game.getCategory() != null ? game.getCategory().getId() : null);
        gameDto.setDescription(game.getDescription());
        gameDto.setImages(game.getImages());
        gameDto.setReleaseDate(game.getReleaseDate());
        gameDto.setPrice(game.getPrice());
        System.out.println("Dto creado" + gameDto);
        return gameDto;
    }

    private Game convertToEntity(GameDTO gameDTO) {
        System.out.println("OWNERIDDDD: " + gameDTO.getOwnerId());
        Game gameEntity = new Game();
        gameEntity.setTitle(gameDTO.getTitle());
        if (gameDTO.getOwnerId() != null) {
            User owner = userRepository.findById(gameDTO.getOwnerId())
                    .orElseThrow(() -> new RuntimeException("Owner not found")); // Obtener el Owner por ID
            gameEntity.setOwner(owner);
        }
        if (gameDTO.getCategoryId() != null) {
            Category category = categoryRepository.findById(gameDTO.getCategoryId())
            .orElseThrow(() -> new RuntimeException("Category not found"));
            gameEntity.setCategory(category);
        }
        gameEntity.setDescription(gameDTO.getDescription());
        gameEntity.setImages(gameDTO.getImages());
        gameEntity.setId(gameDTO.getId());
        gameEntity.setReleaseDate(gameDTO.getReleaseDate());
        gameEntity.setPrice(gameDTO.getPrice());
        return gameEntity;
    }

    //Método donde vamos a obtener todos los juegos y convertirlos a DTO
    public List<GameDTO> getAllGames() {
        List<Game> games = gameRepository.findAll();
        return games.stream()
                .map(game -> new GameDTO(
                    game.getId(),
                    game.getTitle(),
                    game.getDescription(),
                    game.getOwner() != null ? game.getOwner().getId() : null, // Obtener el ID del propietario
                    game.getImages(),
                    game.getReleaseDate(),
                    game.getPrice(),
                    game.getCategory() != null ? game.getCategory().getId() : null))
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
        if (gameDTO.getOwnerId() != null) {
            User owner = userRepository.findById(gameDTO.getOwnerId())
                    .orElseThrow(() -> new RuntimeException("Owner not found")); // Obtener el Owner por ID
            existingGame.setOwner(owner);
        }
        if (gameDTO.getCategoryId() != null) {
            Category category = categoryRepository.findById(gameDTO.getCategoryId())
            .orElseThrow(() -> new RuntimeException("Category not found"));
            existingGame.setCategory(category);
        }
        existingGame.setDescription(gameDTO.getDescription());
        existingGame.setReleaseDate(gameDTO.getReleaseDate());
        existingGame.setImages(gameDTO.getImages()); // Actualizamos imágenes
        existingGame.setPrice(gameDTO.getPrice());   // Actualizamos precio
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

    public List<GameDTO> getElementByCategoryId(Long categoryId) {
        List<Game> games = gameRepository.findByCategoryId(categoryId);
        return games.stream().map(this::convertToDTO).collect(Collectors.toList());
    }
    
}
