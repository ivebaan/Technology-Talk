package com.appdev.contractors.contractorsg5.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CommentCreateDTO(
    @NotNull Long postId,
    @NotBlank @Size(max = 2000) String content
) {}
