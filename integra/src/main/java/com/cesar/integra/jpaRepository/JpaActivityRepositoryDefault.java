package com.cesar.integra.jpaRepository;

import com.cesar.integra.jpaModel.JpaActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface JpaActivityRepositoryDefault extends JpaRepository<JpaActivity, String> {
    Optional<JpaActivity> findByTitle(String title);
}


