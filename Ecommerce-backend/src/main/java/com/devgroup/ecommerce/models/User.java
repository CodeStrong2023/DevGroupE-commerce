package com.devgroup.ecommerce.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
//import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
//@ToString

@Entity
@Table(name = "users")
public class User implements UserDetails {
// esta entidad representa a los usuarios del sistema, que pueden ser: "ADMIN", "OWNER", "GUEST".
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String email;
    
    private String resetToken;
    
    @Enumerated(EnumType.STRING)
    private Role role; // ADMIN, OWNER, GUEST.

    // Relaciones
    @OneToMany(mappedBy = "owner")
    private List<Game> games;
    
    @OneToMany(mappedBy = "guest")
    private List<GameReview> gameReviews;

    // Implementación de métodos de UserDetails
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Retorna los roles del usuario
        return Collections.singleton(new SimpleGrantedAuthority(role.name()));
    }


    @Override
    public boolean isAccountNonExpired() {
        return true; // Lógica de expiración
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Lógica de bloqueo
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Lógica de expiración de credenciales
    }

    @Override
    public boolean isEnabled() {
        return true; // Lógica de habilitación del usuario
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", role=" + role +
                ", gamesCount=" + (games != null ? games.size() : 0) + // Cambiar a tamaño de la lista
                '}';
    }
}

