package com.appdev.contractors.contractorsg5.repository;

import com.appdev.contractors.contractorsg5.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {

}