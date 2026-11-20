package com.appdev.contractors.contractorsg5.service;

import com.appdev.contractors.contractorsg5.entity.FavoritesEntity;
import com.appdev.contractors.contractorsg5.entity.PostEntity;
import com.appdev.contractors.contractorsg5.entity.UserEntity;
import com.appdev.contractors.contractorsg5.repository.FavoritesRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FavoritesService {

    private final FavoritesRepository repo;
    private final UserService userService;
    private final PostService postService;

    public FavoritesService(FavoritesRepository repo, UserService userService, PostService postService) {
        this.repo = repo;
        this.userService = userService;
        this.postService = postService;
    }

    // --- Add favorite using IDs ---
    @Transactional
    public FavoritesEntity saveFavorite(Long userId, Long postId) {
        UserEntity user = userService.getById(userId);
        PostEntity post = postService.getPostById(postId);
        return saveFavorite(user, post);
    }

    // --- Add favorite using entity objects ---
    @Transactional
    public FavoritesEntity saveFavorite(UserEntity user, PostEntity post) {
        if (user == null || post == null) {
            throw new RuntimeException("User or Post cannot be null");
        }

        // Check if favorite already exists
        FavoritesEntity existing = repo.findByUserAndPost(user, post);
        if (existing != null) return existing;

        FavoritesEntity fav = new FavoritesEntity(user, post);
        return repo.saveAndFlush(fav); // ensure DB insert immediately
    }

    // --- Get all favorites ---
    public List<FavoritesEntity> getAllFavorites() {
        return repo.findAll();
    }

    // --- Delete by ID ---
    @Transactional
    public boolean deleteFavorite(Long id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return true;
        }
        return false;
    }

    // --- Delete by user & post ---
    @Transactional
    public boolean deleteFavorite(UserEntity user, PostEntity post) {
        FavoritesEntity fav = repo.findByUserAndPost(user, post);
        if (fav != null) {
            repo.delete(fav);
            return true;
        }
        return false;
    }
}
