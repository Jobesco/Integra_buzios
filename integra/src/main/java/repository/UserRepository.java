package repository;

import model.User;
import java.util.List;
import java.util.Optional;

public interface UserRepository {
    public User save(User user);
    public Optional<User> findByEmail(String email);
    public List<User> findAll();
    public User delete(String email);
}
