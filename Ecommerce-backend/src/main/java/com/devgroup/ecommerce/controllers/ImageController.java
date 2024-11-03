package com.devgroup.ecommerce.controllers;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ImageController { // Controlador para utilizar las imagenes

    @GetMapping("/images/{filename}")
    public Resource getImage(@PathVariable String filename) {
        return new ClassPathResource("static/images/" + filename);
    }
}
