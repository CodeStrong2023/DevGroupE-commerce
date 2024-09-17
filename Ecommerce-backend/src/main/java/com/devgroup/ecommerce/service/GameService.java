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
                .map(game -> new GameDTO(game.getTitle(),game.getDescription(),game.getReleaseDate(),game.getId()))
                .collect(Collectors.toList());

    }


}
