package com.appdev.contractors.contractorsg5.repository;

import com.appdev.contractors.contractorsg5.entity.VoteEntity;
import com.appdev.contractors.contractorsg5.entity.PostEntity;
import com.appdev.contractors.contractorsg5.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VoteRepository extends JpaRepository<VoteEntity, Long> {
    Optional<VoteEntity> findByPostAndUser(PostEntity post, UserEntity user);
    long countByPostAndType(PostEntity post, String type);
    void deleteByPost(PostEntity post);
}
