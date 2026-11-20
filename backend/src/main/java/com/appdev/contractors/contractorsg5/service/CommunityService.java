package com.appdev.contractors.contractorsg5.service;

import org.springframework.stereotype.Service;
import java.util.List;

import com.appdev.contractors.contractorsg5.entity.CommunityEntity;
import com.appdev.contractors.contractorsg5.repository.CommunityRepository;

@Service
public class CommunityService {

    private final CommunityRepository repo;

    public CommunityService(CommunityRepository repo) {
        this.repo = repo;
    }

    // --- Create ---
    public CommunityEntity saveCommunity(CommunityEntity comm) {
        return repo.save(comm);
    }

    // --- Read ---
    public List<CommunityEntity> getAllCommunity() {
        return repo.findAll();
    }

    public CommunityEntity getCommunityById(Long id) {
        return repo.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Community not found"));
    }

    public CommunityEntity getCommunityByName(String name) {
        CommunityEntity comm = repo.findByName(name);
        if (comm == null) {
            throw new IllegalArgumentException("Community not found");
        }
        return comm;
    }

    // --- Update ---
    public CommunityEntity updateCommunity(Long id, CommunityEntity updated) {
        CommunityEntity existing = getCommunityById(id);

        existing.setName(updated.getName());
        existing.setDescription(updated.getDescription());
        existing.setCreatedBy(updated.getCreatedBy());
        existing.setCategory(updated.getCategory());

        return repo.save(existing);
    }

    // --- Delete ---
    public boolean deleteCommunity(Long id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return true;
        }
        return false;
    }
}
