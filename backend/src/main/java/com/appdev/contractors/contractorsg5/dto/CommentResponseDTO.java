package com.appdev.contractors.contractorsg5.dto;

import java.time.LocalDateTime;

public record CommentResponseDTO(
    Long id,
    String content,
    LocalDateTime dateCommented,
    Long postId,
    UserResponseDTO user
) {}
