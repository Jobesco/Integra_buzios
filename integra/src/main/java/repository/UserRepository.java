package repository;

import model.User;
import java.util.List;

public interface UserRepository {
    public User save(User user);
    public User findByEmail(String email);
    public List<User> findAll();
    public User delete(String email);
}
