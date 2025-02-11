package jpaRepository;

import model.User;
import repository.UserRepository;

import java.util.List;
import java.util.Optional;

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
