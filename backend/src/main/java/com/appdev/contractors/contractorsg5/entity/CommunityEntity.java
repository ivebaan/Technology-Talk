package com.appdev.contractors.contractorsg5.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "community")
public class CommunityEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long communityId;

    private String name;
    private String description;
    private LocalDateTime dateCreated;

    // Category of the community
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id")
    @JsonIgnoreProperties("communities") // prevents infinite recursion
    private CategoryEntity category;

    // Creator of the community
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "created_by", nullable = true)
    @JsonIgnoreProperties({"userCommunities", "comments", "password"})
    private UserEntity createdBy;

    // Users in this community
    @OneToMany(mappedBy = "community", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("community")
    private List<UserCommunityEntity> userCommunities;

    @PrePersist
    protected void onCreate() {
        this.dateCreated = LocalDateTime.now();
    }

    public CommunityEntity() {}

    public CommunityEntity(String name, String description, UserEntity createdBy, CategoryEntity category) {
        this.name = name;
        this.description = description;
        this.createdBy = createdBy;
        this.category = category;
        this.dateCreated = LocalDateTime.now();
    }

    // --- Getters & Setters ---
    public Long getCommunityId() { return communityId; }
        public Long getId() { return communityId; }
    public void setCommunityId(Long communityId) { this.communityId = communityId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public LocalDateTime getDateCreated() { return dateCreated; }
    public void setDateCreated(LocalDateTime dateCreated) { this.dateCreated = dateCreated; }
    public CategoryEntity getCategory() { return category; }
    public void setCategory(CategoryEntity category) { this.category = category; }
    public UserEntity getCreatedBy() { return createdBy; }
    public void setCreatedBy(UserEntity createdBy) { this.createdBy = createdBy; }
}
