package com.devgroup.ecommerce.service;

import com.devgroup.ecommerce.dto.LoginDTO;
import com.devgroup.ecommerce.dto.UserDTO;
import com.devgroup.ecommerce.dto.UserRoleDTO;
import com.devgroup.ecommerce.exceptions.InvalidCredentialsException;
import com.devgroup.ecommerce.exceptions.UserNotFoundException;
import com.devgroup.ecommerce.models.Role;
import com.devgroup.ecommerce.models.User;
import com.devgroup.ecommerce.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Inyectar la clave secreta desde el archivo de configuración
    @Value("${jwt.secret}")
    private String secretKeyString;

    public void assignRole(UserRoleDTO userRoleDTO) {
        String username = userRoleDTO.getUsername();
        if (username == null || username.isEmpty()) {
            throw new RuntimeException("Username must not be null or empty");
        }
        
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new UserNotFoundException("User not found"));
        
        try {
            Role role = Role.valueOf(userRoleDTO.getRole());
            user.setRole(role);
            userRepository.save(user);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid role specified: " + userRoleDTO.getRole());
        }
    }
    

    // Método para registrar un nuevo usuario
    public User register(UserDTO userDTO) {
        // Verificar si el username ya está en uso
        if (userRepository.existsByUsername(userDTO.getUsername())) {
            throw new RuntimeException("Username already in use");
        }

        // Crear nuevo usuario a partir del DTO
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword())); // Cifrar la contraseña

        // Guardar el usuario en la base de datos
        return userRepository.save(user);
    }

    // Método para autenticar a un usuario y generar un token JWT
    public String authenticate(LoginDTO loginDTO) {
        // Buscar el usuario por su nombre de usuario
        User user = userRepository.findByUsername(loginDTO.getUsername())
            .orElseThrow(() -> new UserNotFoundException("User not found"));

        // Verificar la contraseña
        if (!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid credentials");
        }

        // Convertir la clave secreta (string) en un objeto SecretKey
        SecretKey secretKey = Keys.hmacShaKeyFor(secretKeyString.getBytes());

        // Generar el token JWT
        String token = Jwts.builder()
                .setSubject(user.getUsername())           // Establecer el sujeto como el nombre de usuario
                .setIssuedAt(new Date())                 // Fecha de emisión del token
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // Expiración en 1 día
                .signWith(secretKey, SignatureAlgorithm.HS512) // Firmar el token con la clave secreta
                .compact();

        return token;
    }

    // Método para obtener un usuario por su ID
    public User getUser(Integer id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }
}