package com.cesar.integra.jpaRepository;

import com.cesar.integra.model.User;
import com.cesar.integra.repository.UserRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class JpaUserRepository implements UserRepository {
    @Override
    public User save(User user) {
        return null;
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return Optional.empty();
    }

    @Override
    public List<User> findAll() {
        return List.of();
    }

    @Override
    public User delete(String email) {
        return null;
    }
}
