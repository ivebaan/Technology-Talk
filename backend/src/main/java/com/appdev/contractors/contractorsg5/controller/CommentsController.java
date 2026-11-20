package com.appdev.contractors.contractorsg5.controller;
import com.appdev.contractors.contractorsg5.dto.CommentCreateDTO;
import com.appdev.contractors.contractorsg5.dto.CommentResponseDTO;
import com.appdev.contractors.contractorsg5.dto.CommentUpdateDTO;
import com.appdev.contractors.contractorsg5.dto.UserResponseDTO;
import com.appdev.contractors.contractorsg5.entity.CommentsEntity;
import com.appdev.contractors.contractorsg5.entity.PostEntity;
import com.appdev.contractors.contractorsg5.entity.UserEntity;
import com.appdev.contractors.contractorsg5.service.CommentsService;
import com.appdev.contractors.contractorsg5.service.PostService;
import com.appdev.contractors.contractorsg5.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentsController {

    private final CommentsService commentsService;
    private final UserService userService;
    private final PostService postService;

    public CommentsController(CommentsService commentsService, UserService userService, PostService postService) {
        this.commentsService = commentsService;
        this.userService = userService;
        this.postService = postService;
    }

    // CREATE
    @PostMapping
    public ResponseEntity<CommentResponseDTO> createComment(
            @Valid @RequestBody CommentCreateDTO dto,
            Authentication authentication
    ) {
        UserEntity user = userService.findByEmail(authentication.getName());
        PostEntity post = postService.getPostById(dto.postId());
        CommentsEntity saved = commentsService.createComment(new CommentsEntity(user, post, dto.content()));
        return ResponseEntity.status(HttpStatus.CREATED).body(toResponse(saved));
    }

    // READ
    @GetMapping
    public List<CommentResponseDTO> getAllComments() {
        return commentsService.getAllComments().stream().map(this::toResponse).toList();
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<?> updateComment(
            @PathVariable Long id,
            @Valid @RequestBody CommentUpdateDTO dto,
            Authentication authentication
    ) {
        CommentsEntity existing = commentsService.getCommentById(id);
        if (existing == null || existing.getUser() == null ||
                !existing.getUser().getEmail().equals(authentication.getName())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        existing.setContent(dto.content());
        return ResponseEntity.ok(toResponse(commentsService.updateComment(id, existing)));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable Long id, Authentication authentication) {
        CommentsEntity existing = commentsService.getCommentById(id);
        if (existing == null) {
            return ResponseEntity.notFound().build();
        }
        if (existing.getUser() == null || !existing.getUser().getEmail().equals(authentication.getName())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        commentsService.deleteComment(id);
        return ResponseEntity.noContent().build();
    }

    private CommentResponseDTO toResponse(CommentsEntity comment) {
        UserEntity user = comment.getUser();
        UserResponseDTO userDto = user == null
                ? null
                : new UserResponseDTO(user.getUserId(), user.getDisplayName(), user.getEmail());
        return new CommentResponseDTO(
                comment.getCommentId(),
                comment.getContent(),
                comment.getDateCommented(),
                comment.getPost() == null ? null : comment.getPost().getPostId(),
                userDto
        );
    }
}
