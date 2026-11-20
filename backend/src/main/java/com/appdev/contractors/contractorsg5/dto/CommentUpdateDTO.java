package com.appdev.contractors.contractorsg5.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CommentUpdateDTO(@NotBlank @Size(max = 2000) String content) {}
