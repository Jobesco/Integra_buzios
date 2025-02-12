package com.cesar.integra.service;

import com.cesar.integra.model.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.cesar.integra.repository.UserRepository;
import java.util.Optional;


@Service
public class AuthService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(String email, String password) {
        String hashedPassword = passwordEncoder.encode(password);
        User user = new User(email, hashedPassword);
        return userRepository.save(user);
    }

    public Optional<User> login(String email, String password){
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            return user;
        }
        return Optional.empty();
    }

}
