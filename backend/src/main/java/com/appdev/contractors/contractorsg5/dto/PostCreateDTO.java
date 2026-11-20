package com.appdev.contractors.contractorsg5.dto;

public class PostCreateDTO {

    private Long userId;
    private Long communityId;
    private String title;
    private String content;
    private int votes;
    private boolean isFavorite;

    // --- Getters & Setters ---
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getCommunityId() {
        return communityId;
    }

    public void setCommunityId(Long communityId) {
        this.communityId = communityId;
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
}
