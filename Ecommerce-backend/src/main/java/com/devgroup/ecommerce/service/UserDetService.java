package com.devgroup.ecommerce.service;

import com.devgroup.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import com.devgroup.ecommerce.models.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Buscar el usuario por nombre de usuario
        Optional<User> userOptional = userRepository.findByUsername(username);

        // Si no se encuentra el usuario, lanzar una excepción
        if (!userOptional.isPresent()) {
            throw new UsernameNotFoundException("Usuario no encontrado con el nombre de usuario: " + username);
        }

        // Convertir User a un objeto que implemente UserDetails
        User user = userOptional.get();
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getUsername())
                .password(user.getPassword())  // La contraseña ya debe estar cifrada en la base de datos
                .roles("USER")  // Aquí puedes asignar roles; en este ejemplo se asigna un rol fijo
                .build();
    }
}
