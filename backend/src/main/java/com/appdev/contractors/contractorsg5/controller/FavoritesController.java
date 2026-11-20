package com.appdev.contractors.contractorsg5.controller;

import com.appdev.contractors.contractorsg5.entity.FavoritesEntity;
import com.appdev.contractors.contractorsg5.service.FavoritesService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/favorites")
public class FavoritesController {

    private final FavoritesService service;

    public FavoritesController(FavoritesService service) {
        this.service = service;
    }

    @PostMapping
    public FavoritesEntity addFavorite(@RequestBody FavoriteRequest request) {
        return service.saveFavorite(request.getUserId(), request.getPostId());
    }

    @GetMapping
    public List<FavoritesEntity> getFavorites() {
        return service.getAllFavorites();
    }

    @DeleteMapping("/delete/{id}")
    public String deleteFavorite(@PathVariable Long id) {
        return service.deleteFavorite(id) ? "Deleted" : "Not Found";
    }

    // DTO for request
    public static class FavoriteRequest {
        private Long userId;
        private Long postId;

        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }
        public Long getPostId() { return postId; }
        public void setPostId(Long postId) { this.postId = postId; }
    }
}
