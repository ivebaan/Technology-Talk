package com.appdev.contractors.contractorsg5.service;

import com.appdev.contractors.contractorsg5.entity.UserEntity;
import com.appdev.contractors.contractorsg5.entity.UserCommunityEntity;
import com.appdev.contractors.contractorsg5.repository.UserRepository;
import com.appdev.contractors.contractorsg5.repository.CommunityRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

@Service
public class UserService {
    // For testing: save user without password encoding
    public UserEntity saveUser(UserEntity user) {
        return userRepository.save(user);
    }

    private final UserRepository userRepository;
    private final UserCommunityService userCommunityService;
    private final CommunityRepository communityRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    
    public UserService(UserRepository userRepository, UserCommunityService userCommunityService, 
                       CommunityRepository communityRepository) {
        this.userRepository = userRepository;
        this.userCommunityService = userCommunityService;
        this.communityRepository = communityRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    // CREATE
    public UserEntity createUser(UserEntity user) {
        // Hash the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // READ by ID
    public UserEntity getById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
    }

    // READ all users
    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    // UPDATE
    public UserEntity updateUser(Long id, UserEntity newUserData) {
        return userRepository.findById(id).map(user -> {
            user.setDisplayName(newUserData.getDisplayName());
            user.setEmail(newUserData.getEmail());
            // Only update password if not empty
            if (newUserData.getPassword() != null && !newUserData.getPassword().isEmpty()) {
                user.setPassword(passwordEncoder.encode(newUserData.getPassword()));
            }
            return userRepository.save(user);
        }).orElse(null);
    }

    // DELETE
    @Transactional
    public void deleteUser(Long id) {
        // Check if user exists
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found with ID: " + id);
        }
        
        // First, set created_by to NULL in communities (communities persist after user deletion)
        communityRepository.nullifyCreatedByForUser(id);
        
        // Then delete the user (cascade will delete posts, comments, favorites, votes, user_communities)
        userRepository.deleteById(id);
    }

    // LOGIN
    public UserEntity findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public boolean checkPassword(UserEntity user, String rawPassword) {
        return passwordEncoder.matches(rawPassword, user.getPassword());
    }

    // COMMUNITY METHODS
    public void addUserToCommunity(Long userId, Long communityId) {
        userCommunityService.addUserToCommunity(userId, communityId, null);
    }

    public void removeUserFromCommunity(Long userId, Long communityId) {
        userCommunityService.removeUserFromCommunity(userId, communityId);
    }

    public List<UserCommunityEntity> getAllCommunitiesForUser(Long userId) {
        return userCommunityService.getAllCommunitiesForUser(userId);
    }
}
