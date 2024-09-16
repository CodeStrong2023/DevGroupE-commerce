package com.devgroup.ecommerce.repository;

import com.devgroup.ecommerce.models.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game,Long> {
}
