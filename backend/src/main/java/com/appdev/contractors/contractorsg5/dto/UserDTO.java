package com.appdev.contractors.contractorsg5.dto;

public class UserDTO {

    private String displayName;
    private String email;

    public UserDTO() {}

    public UserDTO(String displayName, String email) {
        this.displayName = displayName;
        this.email = email;
    }

    // --- Getters & Setters ---
    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
