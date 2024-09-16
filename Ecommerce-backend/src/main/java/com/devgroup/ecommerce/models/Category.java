package com.devgroup.ecommerce.models;

import jakarta.persistence.*;

@Entity
@Table(name="categories") //Indicamos el nombre de la tabla
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name") //Indicamos el nombre de las columnas
    private String name;

    @Column(name = "description")
    private String description;

    //Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
