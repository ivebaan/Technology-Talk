package com.appdev.contractors.contractorsg5.service;

import com.appdev.contractors.contractorsg5.entity.UserCommunityEntity;
import com.appdev.contractors.contractorsg5.entity.UserEntity;
import com.appdev.contractors.contractorsg5.entity.CommunityEntity;
import com.appdev.contractors.contractorsg5.repository.UserCommunityRepository;
import com.appdev.contractors.contractorsg5.repository.UserRepository;
import com.appdev.contractors.contractorsg5.repository.CommunityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserCommunityService {

    @Autowired
    private UserCommunityRepository userCommunityRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CommunityRepository communityRepository;

    // ✅ ADD USER TO COMMUNITY
    @Transactional
    public UserCommunityEntity addUserToCommunity(Long userId, Long communityId, LocalDateTime joinDate) {

        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        CommunityEntity community = communityRepository.findById(communityId)
                .orElseThrow(() -> new RuntimeException("Community not found"));

        UserCommunityEntity userCommunity = new UserCommunityEntity();
        userCommunity.setUser(user);
        userCommunity.setCommunity(community);
        userCommunity.setJoinDate(joinDate != null ? joinDate : LocalDateTime.now());

        return userCommunityRepository.save(userCommunity);
    }

    // ✅ REMOVE USER FROM COMMUNITY
    @Transactional
    public void removeUserFromCommunity(Long userId, Long communityId) {

        UserCommunityEntity userCommunity = userCommunityRepository
                .findByUser_UserIdAndCommunity_CommunityId(userId, communityId)
                .orElseThrow(() -> new RuntimeException("User is not part of this community"));

        userCommunityRepository.delete(userCommunity);
    }

    // GET ALL COMMUNITIES OF A USER
    public List<UserCommunityEntity> getAllCommunitiesForUser(Long userId) {
        return userCommunityRepository.findByUser_UserId(userId);
    }

    // GET ALL USERS IN A COMMUNITY
    public List<UserCommunityEntity> getAllUsersInCommunity(Long communityId) {
        return userCommunityRepository.findByCommunity_CommunityId(communityId);
    }
}
