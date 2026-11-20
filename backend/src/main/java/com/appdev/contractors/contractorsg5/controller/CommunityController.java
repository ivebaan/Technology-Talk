package com.appdev.contractors.contractorsg5.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.appdev.contractors.contractorsg5.entity.CommunityEntity;
import com.appdev.contractors.contractorsg5.service.CommunityService;

@RestController
@RequestMapping("/community")
public class CommunityController {

    private final CommunityService service;

    public CommunityController(CommunityService service) {
        this.service = service;
    }

    // --- Create ---
    @PostMapping
    public CommunityEntity createCommunity(@RequestBody CommunityEntity comm) {
        return service.saveCommunity(comm);
    }

    // --- Read all ---
    @GetMapping
    public List<CommunityEntity> getAllCommunities() {
        return service.getAllCommunity();
    }

    // --- Read by ID ---
    @GetMapping("/{id}")
    public CommunityEntity getCommunityById(@PathVariable Long id) {
        return service.getCommunityById(id);
    }

    // --- Read by Name ---
    @GetMapping("/name/{name}")
    public CommunityEntity getCommunityByName(@PathVariable String name) {
        return service.getCommunityByName(name);
    }

    // --- Update ---
    @PutMapping("/{id}")
    public CommunityEntity updateCommunity(@PathVariable Long id, @RequestBody CommunityEntity comm) {
        return service.updateCommunity(id, comm);
    }

    // --- Delete ---
    @DeleteMapping("/{id}")
    public String deleteCommunity(@PathVariable Long id) {
        boolean deleted = service.deleteCommunity(id);
        return deleted ? "Deleted" : "Not Found";
    }
}
