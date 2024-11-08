package com.devgroup.ecommerce.repository;

import com.devgroup.ecommerce.models.GameReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameReviewRepository extends JpaRepository<GameReview,Long> {

}
