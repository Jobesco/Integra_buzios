package com.cesar.integra.controller;

import com.cesar.integra.model.User;
import com.cesar.integra.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("admin/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/{email}")
    public ResponseEntity<Map<String, Object>> getUserByEmail(@PathVariable String email) {
        Optional<User> user = userService.find(email);
        return user.map(u -> ResponseEntity.ok(u.toJson()))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/promote/{email}")
    public ResponseEntity<Map<String, Object>> promoteToAdmin(@PathVariable String email) {
        Optional<User> user = userService.promoteToAdmin(email);
        return user.map(u -> ResponseEntity.ok(u.toJson()))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllUsers() {
        List<Map<String, Object>> users = userService.findAll()
                .stream()
                .map(User::toJson)
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    @PutMapping("/{email}/updatePassword")
    public ResponseEntity<Void> updatePassword(@PathVariable String email, @RequestParam String newPassword) {
        userService.updatePassword(email, newPassword);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{email}")
    public ResponseEntity<Void> deleteUser(@PathVariable String email) {
        Optional<User> existingUser = userService.find(email);

        if (existingUser.isPresent()) {
            userService.delete(email);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
