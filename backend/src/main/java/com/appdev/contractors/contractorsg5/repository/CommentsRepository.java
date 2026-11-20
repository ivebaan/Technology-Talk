package com.appdev.contractors.contractorsg5.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.appdev.contractors.contractorsg5.entity.CommentsEntity;
import com.appdev.contractors.contractorsg5.entity.PostEntity;

import org.springframework.stereotype.Repository;

@Repository
public interface CommentsRepository extends JpaRepository<CommentsEntity, Long> {
    void deleteByPost(PostEntity post);
}
