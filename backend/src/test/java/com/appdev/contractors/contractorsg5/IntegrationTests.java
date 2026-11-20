package com.appdev.contractors.contractorsg5;

import com.appdev.contractors.contractorsg5.entity.CategoryEntity;
import com.appdev.contractors.contractorsg5.entity.CommunityEntity;
import com.appdev.contractors.contractorsg5.entity.PostEntity;
import com.appdev.contractors.contractorsg5.entity.FavoritesEntity;
import com.appdev.contractors.contractorsg5.entity.UserEntity;
import com.appdev.contractors.contractorsg5.service.CategoryService;
import com.appdev.contractors.contractorsg5.service.CommunityService;
import com.appdev.contractors.contractorsg5.service.PostService;
import com.appdev.contractors.contractorsg5.service.FavoritesService;
import com.appdev.contractors.contractorsg5.service.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
public class IntegrationTests {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private CommunityService communityService;

    @Autowired
    private PostService postService;

    @Autowired
    private FavoritesService favoritesService;

    @Autowired
    private UserService userService;

    @Test
    void testCreateCategory() {
        CategoryEntity category = new CategoryEntity();
        category.setName("TestCategory");
        category.setDescription("Test Description");
        CategoryEntity saved = categoryService.saveCategory(category);
        Assertions.assertNotNull(saved.getCategoryId());
    }

    @Test
    void testCreateCommunity() {
        CommunityEntity community = new CommunityEntity();
        community.setName("TestCommunity");
        community.setDescription("Test Description");
        CommunityEntity saved = communityService.saveCommunity(community);
        Assertions.assertNotNull(saved.getId());
    }

    @Test
    void testCreatePost() {
        // Create and save user
        UserEntity user = new UserEntity();
        user.setDisplayName("TestUser");
        user.setEmail("testuser@example.com");
        user.setPassword("password");
        UserEntity savedUser = userService.saveUser(user);
        Assertions.assertNotNull(savedUser.getUserId());

        // Create and save community
        CommunityEntity community = new CommunityEntity();
        community.setName("PostCommunity");
        community.setDescription("For posts");
        CommunityEntity savedCommunity = communityService.saveCommunity(community);
        Assertions.assertNotNull(savedCommunity.getId());

        // Create and save post
        PostEntity post = new PostEntity();
        post.setTitle("Test Post");
        post.setContent("Test Content");
        post.setCommunity(savedCommunity);
        post.setCreatedBy(savedUser);
        post.setVotes(0);
        post.setIsFavorite(false);
        PostEntity savedPost = postService.savePost(post);
        Assertions.assertNotNull(savedPost.getId());
    }

    @Test
    void testAddFavorite() {
        // Create and save user
        UserEntity user = new UserEntity();
        user.setDisplayName("FavUser");
        user.setEmail("favuser@example.com");
        user.setPassword("password");
        UserEntity savedUser = userService.saveUser(user);
        Assertions.assertNotNull(savedUser.getUserId());

        // Create and save community
        CommunityEntity community = new CommunityEntity();
        community.setName("FavCommunity");
        community.setDescription("For favorites");
        CommunityEntity savedCommunity = communityService.saveCommunity(community);
        Assertions.assertNotNull(savedCommunity.getId());

        // Create and save post
        PostEntity post = new PostEntity();
        post.setTitle("Fav Post");
        post.setContent("Fav Content");
        post.setCommunity(savedCommunity);
        post.setCreatedBy(savedUser);
        post.setVotes(0);
        post.setIsFavorite(false);
        PostEntity savedPost = postService.savePost(post);
        Assertions.assertNotNull(savedPost.getId());

        // Add favorite
        FavoritesEntity savedFav = favoritesService.saveFavorite(savedUser, savedPost);
        Assertions.assertNotNull(savedFav.getFavoriteId());
    }
}
    