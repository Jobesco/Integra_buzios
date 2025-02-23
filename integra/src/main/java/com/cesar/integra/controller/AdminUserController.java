package com.cesar.integra.controller;

import com.cesar.integra.model.User;
import com.cesar.integra.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/admin/user")
public class AdminUserController {
    @Autowired
    private UserService userService;

    @PostMapping("/promote/{email}")
    public ResponseEntity<Map<String, Object>> promoteToAdmin(@PathVariable String email) {
        Optional<User> user = userService.promoteToAdmin(email);
        return user.map(u -> ResponseEntity.ok(u.toJson()))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/demote/{email}")
    public ResponseEntity<Map<String, Object>> demoteFromAdmin(@PathVariable String email) {
        Optional<User> user = userService.demoteFromAdmin(email);
        return user.map(u -> ResponseEntity.ok(u.toJson()))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
