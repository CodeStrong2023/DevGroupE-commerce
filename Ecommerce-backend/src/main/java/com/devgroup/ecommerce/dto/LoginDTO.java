package com.devgroup.ecommerce.dto;

import com.devgroup.ecommerce.models.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginDTO {
    private Integer id;
    private String username;
    private String password;
    private String email;
    private String token;
    private Role role;

    public LoginDTO(Integer id, String username, String email, String token, Role role){
        this.id = id;
        this.username = username;
        this.email = email;
        this.token = token;
        this.role = role;
    }
}
