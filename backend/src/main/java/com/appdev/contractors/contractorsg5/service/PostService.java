package com.appdev.contractors.contractorsg5.service;

import com.appdev.contractors.contractorsg5.entity.PostEntity;
import com.appdev.contractors.contractorsg5.entity.UserEntity;
import com.appdev.contractors.contractorsg5.entity.VoteEntity;
import com.appdev.contractors.contractorsg5.repository.PostRepository;
import com.appdev.contractors.contractorsg5.repository.VoteRepository;

import jakarta.transaction.Transactional;

import com.appdev.contractors.contractorsg5.repository.CommentsRepository;
import com.appdev.contractors.contractorsg5.repository.FavoritesRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private CommentsRepository commentsRepository;

    @Autowired
    private FavoritesRepository favoritesRepository;

    @Autowired
    private UserService userService;

    // --- CREATE ---
    public PostEntity savePost(PostEntity post) {
        return postRepository.save(post);
    }

    // --- READ BY USER ID ---
    public List<PostEntity> getPostsByUserId(Long userId) {
        return postRepository.findByCreatedBy_UserId(userId);
    }

    // --- READ ALL ---
    public List<PostEntity> getAllPosts() {
        return postRepository.findAll();
    }

    // --- READ BY ID ---
    public PostEntity getPostById(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Post with id " + id + " not found"));
    }

    // --- UPDATE ---
    public PostEntity updatePost(Long id, PostEntity updatedPost) {
        PostEntity existingPost = getPostById(id);
        existingPost.setTitle(updatedPost.getTitle());
        existingPost.setContent(updatedPost.getContent());
        return postRepository.save(existingPost);
    }

    // --- DELETE ---
    @Transactional
    public void deletePost(Long postId) {
        PostEntity post = getPostById(postId); // throws if not found
        voteRepository.deleteByPost(post);
        commentsRepository.deleteByPost(post);
        favoritesRepository.deleteByPost(post);
        postRepository.delete(post);
    }

    // --- VOTE ---
    @Transactional
    public PostEntity votePost(Long postId, Long userId, String type) {
    PostEntity post = getPostById(postId);
    UserEntity user = userService.getById(userId);

    // Find existing vote for user and post
    VoteEntity vote = voteRepository.findByPostAndUser(post, user).orElse(null);

    if (vote != null) {
        // If vote exists, update or remove it
        if (vote.getType().equals(type)) {
            // Same vote again, remove it (unvote)
            voteRepository.delete(vote);
        } else {
            // Changing vote from "up" to "down" or vice versa
            vote.setType(type);
            voteRepository.save(vote);
        }
    } else {
        // New vote (user hasn't voted yet)
        vote = new VoteEntity();
        vote.setPost(post);
        vote.setUser(user);
        vote.setType(type);
        voteRepository.save(vote);
    }

    // Update the post's votes count (upvotes - downvotes)
    long upVotes = voteRepository.countByPostAndType(post, "up");
    long downVotes = voteRepository.countByPostAndType(post, "down");
    post.setVotes((int)(upVotes - downVotes));

    return postRepository.save(post);
}

}

