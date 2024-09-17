package com.devgroup.ecommerce.controllers;

import com.devgroup.ecommerce.dto.GameDTO;
import com.devgroup.ecommerce.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

    // LA CLASE GameController expone los endpoints para interactuar con los juegos.
@RestController
@RequestMapping("/games")
public class GamesController {
    @Autowired
    private GameService gameService;

    @GetMapping
    public List<GameDTO> getAllGames(){
        return gameService.getAllGames();
    }

}
