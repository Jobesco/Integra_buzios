package com.cesar.integra.jpaRepository;

import com.cesar.integra.jpaModel.JpaActivity;
import com.cesar.integra.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface JpaActivityRepositoryDefault extends JpaRepository<JpaActivity, String> {
    Optional<JpaActivity> findByTitle(String title);
}


