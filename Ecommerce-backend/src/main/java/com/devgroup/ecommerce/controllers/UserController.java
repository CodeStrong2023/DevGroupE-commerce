package com.devgroup.ecommerce.controllers;

//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devgroup.ecommerce.dto.ChangePasswordDTO;
import com.devgroup.ecommerce.dto.ForgotPasswordRequest;
import com.devgroup.ecommerce.dto.LoginDTO;
import com.devgroup.ecommerce.dto.ResetPasswordRequest;
import com.devgroup.ecommerce.dto.UserDTO;
import com.devgroup.ecommerce.models.User;
import com.devgroup.ecommerce.security.JwtUtil;
import com.devgroup.ecommerce.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;


    @Value("${jwt.secret}")
    private String secretKey;

    //@Autowired
    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil; // Inicialización en el constructor
    }

    // Registro de usuario
    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@RequestBody UserDTO userDTO) {
        User user = userService.register(userDTO);
        return ResponseEntity.ok(new UserDTO(user));
    }

    // Inicio de sesión
    @PostMapping("/login")
    public ResponseEntity<LoginDTO> loginUser(@RequestBody LoginDTO loginDTO) {
        User user = userService.authenticate(loginDTO);

        // Generar el token JWT usando la clave secreta definida en application.properties
        String token = jwtUtil.generateToken(user);

        LoginDTO response = new LoginDTO(user.getId(),user.getUsername(), user.getEmail(), token, user.getRole());
        return ResponseEntity.ok(response);
    }
    
    // Consulta del perfil del usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserProfile(@PathVariable Integer id) {
        User user = userService.getUser(id);
        return ResponseEntity.ok(new UserDTO(user));
    }

    // Solicitud de restablecimiento de contraseña
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        userService.sendResetPasswordToken(request.getEmail());
        return ResponseEntity.ok("Correo de restablecimiento enviado.");
    }

    // Restablecimiento de contraseña usando el token
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {
        userService.resetPassword(request.getToken(), request.getNewPassword());
        return ResponseEntity.ok("Contraseña restablecida exitosamente.");
    }


    // Cambio de contraseña
    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordDTO request) {
        userService.changePassword(request.getEmail(), request.getCurrentPassword(), request.getNewPassword());
        return ResponseEntity.ok("Contraseña cambiada exitosamente.");
    }
}
