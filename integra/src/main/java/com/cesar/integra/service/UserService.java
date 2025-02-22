package com.cesar.integra.service;

import com.cesar.integra.model.User;
import com.cesar.integra.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(String email, String rawPassword, String name, Integer lastManagementId, List<String> management,
                             String phone, boolean pwd, String gender) {
        List<String> roles = List.of("USER");
        User user = new User(email, passwordEncoder.encode(rawPassword), name, roles, lastManagementId, management, phone, pwd, gender, true);
        return userRepository.save(user);
    }

    public Optional<User> promoteToAdmin(String email) {
        Optional<User> foundUser = userRepository.findByEmail(email);

        if(foundUser.isEmpty()){
            return Optional.empty();
        }

        User user = foundUser.get();
        List<String> roles = new ArrayList<>(user.getRoles());

        if (!roles.contains("ADMIN")) {
            roles.add("ADMIN");
            user.setRoles(roles);
            userRepository.save(user);
        }
        return Optional.of(user);
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
