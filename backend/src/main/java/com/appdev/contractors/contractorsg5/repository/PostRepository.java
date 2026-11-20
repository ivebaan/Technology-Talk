package com.appdev.contractors.contractorsg5.repository;

import com.appdev.contractors.contractorsg5.entity.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<PostEntity, Long> {
	// Find posts by user
	java.util.List<PostEntity> findByCreatedBy_UserId(Long userId);
}
