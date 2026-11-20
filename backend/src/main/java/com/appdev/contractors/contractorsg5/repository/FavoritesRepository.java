package com.appdev.contractors.contractorsg5.repository;

import com.appdev.contractors.contractorsg5.entity.FavoritesEntity;
import com.appdev.contractors.contractorsg5.entity.PostEntity;
import com.appdev.contractors.contractorsg5.entity.UserEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoritesRepository extends JpaRepository<FavoritesEntity, Long> {
    void deleteByPost(PostEntity post);
    FavoritesEntity findByUserAndPost(UserEntity user, PostEntity post);
}
