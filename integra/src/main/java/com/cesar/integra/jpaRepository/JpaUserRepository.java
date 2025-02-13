package com.cesar.integra.jpaRepository;

import com.cesar.integra.jpaModel.JpaUser;
import com.cesar.integra.mapper.UserMapper;
import com.cesar.integra.model.User;
import com.cesar.integra.repository.UserRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import static org.springframework.util.Assert.notNull;

@Repository
public class JpaUserRepository implements UserRepository {

    private final JpaUserRepositoryDefault jpaUserJpaRepositoryDefault;

    public JpaUserRepository(JpaUserRepositoryDefault jpaUserJpaRepositoryDefault) {
        this.jpaUserJpaRepositoryDefault = jpaUserJpaRepositoryDefault;
    }

    @Override
    public User save(User user) {
        notNull(user, "User must not be null");

        JpaUser jpaUser = UserMapper.toJpaUser(user);
        JpaUser savedUser = jpaUserJpaRepositoryDefault.save(jpaUser);

        return UserMapper.toUser(savedUser);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        notNull(email, "Email must not be null");

        return jpaUserJpaRepositoryDefault.findByEmail(email)
                .map(UserMapper::toUser);
    }

    @Override
    public List<User> findAll() {
        return jpaUserJpaRepositoryDefault.findAll().stream()
                .map(UserMapper::toUser)
                .toList();
    }

    @Override
    public void delete(String email) {
        notNull(email, "Email must not be null");

        jpaUserJpaRepositoryDefault.deleteById(email);
    }
}
