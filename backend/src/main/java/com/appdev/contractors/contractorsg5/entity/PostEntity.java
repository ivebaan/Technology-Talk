package com.appdev.contractors.contractorsg5.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "posts")
public class PostEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    private String title;
    private String content;
    private LocalDateTime dateCreated;

    private int votes;
    @Column(name = "favorite", nullable = false)
    private boolean isFavorite;


    @ManyToOne
    @JoinColumn(name = "created_by", nullable = true)
    private UserEntity createdBy;

    @ManyToOne
    @JoinColumn(name = "community_id", nullable = false)
    private CommunityEntity community;

    

    // --- Constructors ---
    public PostEntity() {
    }

    public PostEntity(
            String title,
            String content,
            UserEntity createdBy,
            CommunityEntity community,
            int votes,
            boolean isFavorite
    ) {
        this.title = title;
        this.content = content;
        this.createdBy = createdBy;
        this.community = community;
        this.votes = votes;
        this.isFavorite = isFavorite;
        this.dateCreated = LocalDateTime.now();
    }

    // --- Getters & Setters ---
    public Long getPostId() {
        return postId;
    }

    public Long getId() { return postId; }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(LocalDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    public int getVotes() {
        return votes;
    }

    public void setVotes(int votes) {
        this.votes = votes;
    }

    public boolean getIsFavorite() {
        return isFavorite;
    }

    public void setIsFavorite(boolean isFavorite) {
        this.isFavorite = isFavorite;
    }

    public UserEntity getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(UserEntity createdBy) {
        this.createdBy = createdBy;
    }

    public CommunityEntity getCommunity() {
        return community;
    }

    public void setCommunity(CommunityEntity community) {
        this.community = community;
    }
}
