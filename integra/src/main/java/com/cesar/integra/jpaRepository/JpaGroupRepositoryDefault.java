package com.cesar.integra.jpaRepository;

import com.cesar.integra.jpaModel.JpaGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JpaGroupRepositoryDefault extends JpaRepository<JpaGroup, Integer> {
    public List<JpaGroup> findByActivity_Title(String activity_Title);
}
