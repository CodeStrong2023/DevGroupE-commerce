package com.devgroup.ecommerce.dto;

import org.springframework.lang.NonNull;

import com.devgroup.ecommerce.models.Role;
import com.devgroup.ecommerce.models.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Integer id;
    @NonNull
    private String username;
    @NonNull
    private String email;
    private String password;
    private String resetToken;
    private Role role;

    public UserDTO(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.role = user.getRole();
    }
}