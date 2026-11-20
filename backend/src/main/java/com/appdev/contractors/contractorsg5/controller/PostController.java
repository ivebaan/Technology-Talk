package com.appdev.contractors.contractorsg5.controller;

import com.appdev.contractors.contractorsg5.dto.PostCreateDTO;
import com.appdev.contractors.contractorsg5.entity.CommunityEntity;
import com.appdev.contractors.contractorsg5.entity.PostEntity;
import com.appdev.contractors.contractorsg5.entity.UserEntity;
import com.appdev.contractors.contractorsg5.service.CommunityService;
import com.appdev.contractors.contractorsg5.service.PostService;
import com.appdev.contractors.contractorsg5.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    @Autowired
    private CommunityService communityService;

    // --- CREATE POST ---
    @PostMapping
    public PostEntity createPost(@RequestBody PostCreateDTO dto) {
        UserEntity user = userService.getById(dto.getUserId());
        CommunityEntity community = communityService.getCommunityById(dto.getCommunityId());

        PostEntity post = new PostEntity(
                dto.getTitle(),
                dto.getContent(),
                user,
                community,
                dto.getVotes(),
                dto.getIsFavorite()
        );

        return postService.savePost(post);
    }

    // --- READ ALL POSTS ---
    @GetMapping("/getAll")
    public List<PostEntity> getAllPosts() {
        // Returns posts WITHOUT nested mappings
        return postService.getAllPosts();
    }

    // --- READ POSTS BY USER ID ---
    @GetMapping("/user/{userId}")
    public List<PostEntity> getPostsByUserId(@PathVariable Long userId) {
        return postService.getPostsByUserId(userId);
    }

    // --- READ POST BY ID ---
    @GetMapping("/{id}")
    public PostEntity getPostById(@PathVariable Long id) {
        return postService.getPostById(id);
    }

    // --- UPDATE POST ---
    @PutMapping("/update/{id}")
    public PostEntity updatePost(@PathVariable Long id, @RequestBody PostEntity updatedPost) {
        return postService.updatePost(id, updatedPost);
    }

    // --- DELETE POST ---
    @DeleteMapping("/delete/{id}")
    public String deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return "Post with ID " + id + " has been deleted.";
    }

    // --- VOTE POST ---
    @PatchMapping("/{id}/vote")
    public PostEntity votePost(
            @PathVariable Long id,
            @RequestParam Long userId,
            @RequestParam String type
    ) {
        return postService.votePost(id, userId, type);
    }
}
