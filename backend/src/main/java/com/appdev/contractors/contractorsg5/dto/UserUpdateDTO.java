package com.appdev.contractors.contractorsg5.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserUpdateDTO(
    @NotBlank @Size(max = 100) String displayName,
    @NotBlank @Email @Size(max = 255) String email,
    @Size(max = 128) String password
) {}
