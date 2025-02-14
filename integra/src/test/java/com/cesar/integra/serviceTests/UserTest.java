package com.cesar.integra.serviceTests;

import com.cesar.integra.model.User;
import com.cesar.integra.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class UserTest {
    @Autowired
    private UserService userService;

    @Test
    void testSaveAndFindUser() {
        User user = userService.registerUser("test@example.com", "password123",
                "Test User", List.of("HR", "Finance"), "123456789", false, "Male");

        Optional<User> foundUser = userService.find(user.getEmail());

        assertTrue(foundUser.isPresent());
        assertEquals("test@example.com", foundUser.get().getEmail());
        assertEquals("Test User", foundUser.get().getName());
    }

    @Test
    void testLoginSuccess() {
        userService.registerUser("login@example.com", "mypassword",
                "Login User", List.of("IT"), "987654321", true, "Female");

        Optional<User> loggedInUser = userService.login("login@example.com", "mypassword");

        assertTrue(loggedInUser.isPresent());
        assertEquals("login@example.com", loggedInUser.get().getEmail());
    }

    @Test
    void testLoginFailure() {
        userService.registerUser("wrongpass@example.com", "securepass",
                "Wrong Password User", List.of("Admin"), "111222333", false, "Non-binary");

        Optional<User> loggedInUser = userService.login("wrongpass@example.com", "wrongpassword");

        assertFalse(loggedInUser.isPresent());
    }

    @Test
    void testUpdatePassword() {
        userService.registerUser("update@example.com", "oldpassword",
                "Update Test", List.of("Sales"), "000111222", false, "Male");

        userService.updatePassword("update@example.com", "newpassword");

        Optional<User> updatedUser = userService.login("update@example.com", "newpassword");

        assertTrue(updatedUser.isPresent());
    }

    @Test
    void testUpdateUser(){
        User user = userService.registerUser(
                "user@example.com",
                "password123",
                "Test User",
                List.of("TI", "RH"),
                "11987654321",
                false,
                "Masculino"
        );

        Optional<User> userOpt = userService.find(user.getEmail());
        assertTrue(userOpt.isPresent());

        User updatedUser = userOpt.get();
        updatedUser.setName("Updated User");

        userService.save(updatedUser);

        Optional<User> foundUser = userService.find(user.getEmail());
        assertTrue(foundUser.isPresent());
        assertEquals("Updated User", foundUser.get().getName());
    }

    @Test
    void testDeleteUser() {
        User user = userService.registerUser(
                "user@example.com",
                "password123",
                "Test User",
                List.of("TI", "RH"),
                "11987654321",
                false,
                "Masculino"
        );

        userService.delete(user.getEmail());

        Optional<User> deletedUser = userService.find(user.getEmail());
        assertFalse(deletedUser.isPresent());
    }
}
