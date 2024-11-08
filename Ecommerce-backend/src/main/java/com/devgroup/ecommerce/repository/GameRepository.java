package com.devgroup.ecommerce.repository;

import com.devgroup.ecommerce.models.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

    // LA CLASE GameRepository interactúa con la base de datos y utiliza la entidad Game.
@Repository
public interface GameRepository extends JpaRepository<Game,Long> {
    List<Game> findByCategoryId(Long categoryId);
}
