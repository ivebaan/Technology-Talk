package com.appdev.contractors.contractorsg5.repository;

import com.appdev.contractors.contractorsg5.entity.CommunityEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CommunityRepository extends JpaRepository<CommunityEntity, Long> {
    CommunityEntity findByName(String name);
    
    // Set created_by to NULL for all communities by this user
    @Modifying
    @Query("UPDATE CommunityEntity c SET c.createdBy = NULL WHERE c.createdBy.userId = :userId")
    void nullifyCreatedByForUser(@Param("userId") Long userId);
}
