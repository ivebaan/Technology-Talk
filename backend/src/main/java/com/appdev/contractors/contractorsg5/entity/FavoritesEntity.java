package com.appdev.contractors.contractorsg5.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "favorites")
public class FavoritesEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long favoriteId;

    private LocalDateTime dateAdded;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({"favorites", "password"})
    private UserEntity user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "post_id", nullable = false)
    @JsonIgnoreProperties({"favorites"})
    private PostEntity post;

    public FavoritesEntity() {
        this.dateAdded = LocalDateTime.now();
    }

    public FavoritesEntity(UserEntity user, PostEntity post) {
        this.user = user;
        this.post = post;
        this.dateAdded = LocalDateTime.now();
    }

    public Long getFavoriteId() { return favoriteId; }
    public void setFavoriteId(Long favoriteId) { this.favoriteId = favoriteId; }

    public LocalDateTime getDateAdded() { return dateAdded; }
    public void setDateAdded(LocalDateTime dateAdded) { this.dateAdded = dateAdded; }

    public UserEntity getUser() { return user; }
    public void setUser(UserEntity user) { this.user = user; }

    public PostEntity getPost() { return post; }
    public void setPost(PostEntity post) { this.post = post; }
}
