package com.appdev.contractors.contractorsg5.repository;

import com.appdev.contractors.contractorsg5.entity.UserCommunityEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserCommunityRepository extends JpaRepository<UserCommunityEntity, Long> {

    Optional<UserCommunityEntity> findByUser_UserIdAndCommunity_CommunityId(Long userId, Long communityId);

    List<UserCommunityEntity> findByUser_UserId(Long userId);

    List<UserCommunityEntity> findByCommunity_CommunityId(Long communityId);
}
