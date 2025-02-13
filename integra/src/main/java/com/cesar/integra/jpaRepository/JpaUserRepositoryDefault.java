package com.cesar.integra.jpaRepository;

import com.cesar.integra.jpaModel.JpaUser;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface JpaUserRepositoryDefault extends JpaRepository<JpaUser, String> {
    Optional<JpaUser> findByEmail(String email);
}
