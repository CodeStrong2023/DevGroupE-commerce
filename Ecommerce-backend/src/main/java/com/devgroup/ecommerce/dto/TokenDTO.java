package com.devgroup.ecommerce.dto;

import lombok.Data;

@Data
public class TokenDTO {
    private String token;
    private String type = "Bearer"; // Tipo de token, usualmente Bearer para JWT

    public TokenDTO(String token) {
        this.token = token;
    }
}