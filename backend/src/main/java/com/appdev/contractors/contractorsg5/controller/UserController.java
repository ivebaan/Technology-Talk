package com.appdev.contractors.contractorsg5.controller;

import com.appdev.contractors.contractorsg5.dto.ApiResponse;
import com.appdev.contractors.contractorsg5.dto.LoginRequest;
import com.appdev.contractors.contractorsg5.dto.UserCreateDTO;
import com.appdev.contractors.contractorsg5.dto.UserResponseDTO;
import com.appdev.contractors.contractorsg5.dto.UserUpdateDTO;
import com.appdev.contractors.contractorsg5.entity.UserEntity;
import com.appdev.contractors.contractorsg5.entity.UserCommunityEntity;
import com.appdev.contractors.contractorsg5.service.UserCommunityService;
import com.appdev.contractors.contractorsg5.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final UserCommunityService userCommunityService;

    public UserController(UserService userService, UserCommunityService userCommunityService) {
        this.userService = userService;
        this.userCommunityService = userCommunityService;
    }

    // CREATE
    @PostMapping
    public ResponseEntity<UserResponseDTO> createUser(@Valid @RequestBody UserCreateDTO dto) {
        UserEntity user = new UserEntity();
        user.setDisplayName(dto.displayName());
        user.setEmail(dto.email());
        user.setPassword(dto.password());
        return ResponseEntity.status(201).body(toResponse(userService.createUser(user)));
    }

    // READ
    @GetMapping
    public List<UserResponseDTO> getAllUsers() {
        return userService.getAllUsers().stream().map(this::toResponse).toList();
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserUpdateDTO dto,
            Authentication authentication
    ) {
        UserEntity current = userService.findByEmail(authentication.getName());
        if (current == null || !current.getUserId().equals(id)) {
            return ResponseEntity.status(403).body(new ApiResponse("Forbidden"));
        }
        UserEntity update = new UserEntity();
        update.setDisplayName(dto.displayName());
        update.setEmail(dto.email());
        update.setPassword(dto.password());
        return ResponseEntity.ok(toResponse(userService.updateUser(id, update)));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id, Authentication authentication) {
        UserEntity current = userService.findByEmail(authentication.getName());
        if (current == null || !current.getUserId().equals(id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ApiResponse("Forbidden"));
        }
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok().body(new ApiResponse("User deleted successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("User not found"));
        }
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request,
                                   HttpServletRequest httpRequest) {
        UserEntity user = userService.findByEmail(request.email());
        if (user != null && userService.checkPassword(user, request.password())) {
            httpRequest.getSession(true).invalidate();
            jakarta.servlet.http.HttpSession session = httpRequest.getSession(true);
            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    user.getEmail(),
                    null,
                    List.of(new SimpleGrantedAuthority("ROLE_USER"))
            );
            SecurityContext context = SecurityContextHolder.createEmptyContext();
            context.setAuthentication(authentication);
            SecurityContextHolder.setContext(context);
            session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, context);
            return ResponseEntity.ok(toResponse(user));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse("Invalid credentials"));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        UserEntity user = userService.findByEmail(authentication.getName());
        return user == null
                ? ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
                : ResponseEntity.ok(toResponse(user));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse> logout(HttpServletRequest request) {
        jakarta.servlet.http.HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok(new ApiResponse("Logged out"));
    }

    // COMMUNITY METHODS
    @PostMapping("/{userId}/joinCommunity")
    public String addUserToCommunity(@PathVariable Long userId,
                                     @RequestParam Long communityId,
                                     @RequestParam(required = false) LocalDateTime joinDate) {
        try {
            userCommunityService.addUserToCommunity(userId, communityId, joinDate);
            return "User successfully added to the community.";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    @DeleteMapping("/{userId}/leaveCommunity")
    public String removeUserFromCommunity(@PathVariable Long userId,
                                          @RequestParam Long communityId) {
        try {
            userCommunityService.removeUserFromCommunity(userId, communityId);
            return "User successfully removed from the community.";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    @GetMapping("/{userId}/communities")
    public List<UserCommunityEntity> getAllCommunitiesForUser(@PathVariable Long userId) {
        try {
            return userCommunityService.getAllCommunitiesForUser(userId);
        } catch (Exception e) {
            return null;
        }
    }

    private UserResponseDTO toResponse(UserEntity user) {
        return new UserResponseDTO(user.getUserId(), user.getDisplayName(), user.getEmail());
    }
}
