package com.devgroup.ecommerce.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import com.devgroup.ecommerce.models.Game;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GameDTO {
    private Long id;
    private String title;
    private String description;
    private Integer ownerId;
    private List<String> images;
    private LocalDate releaseDate;
    private BigDecimal price;
    private Long categoryId;

    public GameDTO(Game game){
        this.id = game.getId();
        this.title = game.getTitle();
        this.description = game.getDescription();
        this.ownerId = game.getOwner().getId();
        this.images = game.getImages();
        this.releaseDate = game.getReleaseDate();
        this.price = game.getPrice();
        this.categoryId = game.getCategory().getId();
    }
    public GameDTO(String title, String description, Integer ownerId, List<String> images, LocalDate releaseDate, BigDecimal price, Long categoryId){
        this.title = title;
        this.description = description;
        this.ownerId = ownerId;
        this.images = images;
        this.releaseDate = releaseDate;
        this.price = price;
        this.categoryId = categoryId;
    }

}
