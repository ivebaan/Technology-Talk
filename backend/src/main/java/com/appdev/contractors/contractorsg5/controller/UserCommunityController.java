package com.appdev.contractors.contractorsg5.controller;

import com.appdev.contractors.contractorsg5.entity.UserCommunityEntity;
import com.appdev.contractors.contractorsg5.service.UserCommunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/usercommunity")
public class UserCommunityController {

    @Autowired
    private UserCommunityService userCommunityService;

    // ADD USER TO COMMUNITY
    @PostMapping
    public ResponseEntity<UserCommunityEntity> addUserToCommunity(
            @RequestParam Long userId,
            @RequestParam Long communityId,
            @RequestParam(required = false) LocalDateTime joinDate) {

        UserCommunityEntity result = userCommunityService.addUserToCommunity(
                userId,
                communityId,
                joinDate
        );

        return ResponseEntity.ok(result);
    }

    // REMOVE USER FROM COMMUNITY
    @DeleteMapping
    public ResponseEntity<String> removeUserFromCommunity(
            @RequestParam Long userId,
            @RequestParam Long communityId) {

        userCommunityService.removeUserFromCommunity(userId, communityId);
        return ResponseEntity.ok("User removed from the community successfully.");
    }

    // GET ALL COMMUNITIES OF A USER
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserCommunityEntity>> getAllCommunitiesForUser(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                userCommunityService.getAllCommunitiesForUser(userId)
        );
    }

    // GET ALL USERS OF A COMMUNITY
    @GetMapping("/community/{communityId}")
    public ResponseEntity<List<UserCommunityEntity>> getAllUsersInCommunity(
            @PathVariable Long communityId) {

        return ResponseEntity.ok(
                userCommunityService.getAllUsersInCommunity(communityId)
        );
    }
}
