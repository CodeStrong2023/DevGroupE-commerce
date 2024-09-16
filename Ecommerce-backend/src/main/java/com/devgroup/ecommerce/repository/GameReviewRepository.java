package com.devgroup.ecommerce.repository;

import com.devgroup.ecommerce.models.GameReview;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameReviewRepository extends JpaRepository<GameReview,Long> {
}
