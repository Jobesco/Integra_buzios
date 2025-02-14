package com.cesar.integra.service;

import com.cesar.integra.model.User;
import com.cesar.integra.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(String email, String rawPassword, String name, List<String> management,
                             String phone, boolean pwd, String gender) {
        User user = new User(email, name, management, phone, pwd, gender, true);
        user.setEncodedPassword(passwordEncoder.encode(rawPassword));
        return userRepository.save(user);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public Optional<User> find(String email) {
        return userRepository.findByEmail(email);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public void delete(String email) {
        userRepository.delete(email);
    }

    public void updatePassword(String email, String newPassword) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        userOpt.ifPresent(user -> {
            user.setEncodedPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
        });
    }

    public Optional<User> login(String email, String password){
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            return user;
        }
        return Optional.empty();
    }
}
