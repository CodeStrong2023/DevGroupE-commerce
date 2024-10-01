package com.devgroup.ecommerce.controllers;

import com.devgroup.ecommerce.dto.LoginDTO;
import com.devgroup.ecommerce.dto.TokenDTO;
import com.devgroup.ecommerce.dto.UserDTO;
import com.devgroup.ecommerce.models.User;
import com.devgroup.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@RequestBody UserDTO userDTO) {
        User user = userService.register(userDTO);
        return ResponseEntity.ok(new UserDTO(user));
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDTO> loginUser(@RequestBody LoginDTO loginDTO) {
        String token = userService.authenticate(loginDTO);
        return ResponseEntity.ok(new TokenDTO(token));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserProfile(@PathVariable Integer id) {
        User user = userService.getUser(id);
        return ResponseEntity.ok(new UserDTO(user));
    }
}
