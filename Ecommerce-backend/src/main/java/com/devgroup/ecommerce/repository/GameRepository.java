package com.devgroup.ecommerce.repository;

import com.devgroup.ecommerce.models.Game;
import org.springframework.data.jpa.repository.JpaRepository;

    // LA CLASE GameRepository interactúa con la base de datos y utiliza la entidad Game.
public interface GameRepository extends JpaRepository<Game,Long> {
}
