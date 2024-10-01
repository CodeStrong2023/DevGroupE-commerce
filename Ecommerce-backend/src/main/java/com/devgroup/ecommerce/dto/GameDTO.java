package com.devgroup.ecommerce.dto;

import java.time.LocalDate;

    // ESTA CLASE GameDTO contiene solo los campos necesarios para transferir.
public class GameDTO {

    //REVISAR SI ES NECESARIO EL ID TAMBIÉN CON LA FECHA
    private String title;

    private String description;

    private LocalDate releaseDate;

    private Long id;

    public GameDTO() {
    }
    public GameDTO(String title, String description, LocalDate releaseDate, Long id) {
        this.title = title;
        this.description = description;
        this.releaseDate = releaseDate;
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
