package com.cesar.integra.serviceTests;

import com.cesar.integra.model.*;
import com.cesar.integra.service.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class RegistrationTest {
    @Autowired
    private RegistrationService registrationService;

    @Autowired
    private UserService userService;

    @Autowired
    private ActivityService activityService;

    @Test
    void testCreateRegistration() {
        User user = userService.registerUser("testReg@example.com", "password123",
                "Test User", List.of("HR", "Finance"), "123456789", false, "Male");

        Optional<User> foundUser = userService.find(user.getEmail());
        if (foundUser.isPresent()) {
            user = foundUser.get();
        }

        Activity activity = new Activity("Workshop", "Java Basics", "Accessible for PwD",
                true, 3, 50, 2, "Room 101", 20.0f);

        activityService.save(activity);

        Registration registration = new Registration(user, activity, LocalDateTime.now(),
                List.of(Date.valueOf("2025-06-05")), "Pending", false);

        Registration savedRegistration = registrationService.save(registration);

        assertNotNull(savedRegistration);
        assertEquals("testReg@example.com", savedRegistration.getUser().getEmail());

        Optional<Registration> foundRegistration = registrationService.findById(savedRegistration.getId());
        assertTrue(foundRegistration.isPresent());
    }

    @Test
    void testUpdateRegistrationStatus() {
        User user = userService.registerUser("testUpdateReg@example.com", "password123",
                "Test User", List.of("HR", "Finance"), "123456789", false, "Male");

        Optional<User> foundUser = userService.find(user.getEmail());
        if (foundUser.isPresent()) {
            user = foundUser.get();
        }

        Activity activity = new Activity("Python Course", "Intro to Python", "Accessible for PwD",
                true, 3, 50, 2, "Room 202", 15.0f);

        activityService.save(activity);

        Registration registration = new Registration(user, activity, LocalDateTime.now(),
                List.of(Date.valueOf("2025-06-10")), "Pending", false);

        registration = registrationService.save(registration);

        Optional<Registration> registrationOpt = registrationService.findById(registration.getId());
        assertTrue(registrationOpt.isPresent());

        Registration updatedRegistration = registrationOpt.get();
        updatedRegistration.setStatus("Confirmed");

        registrationService.save(updatedRegistration);

        Optional<Registration> foundRegistration = registrationService.findById(registration.getId());
        assertTrue(foundRegistration.isPresent());
        assertEquals("Confirmed", foundRegistration.get().getStatus());
    }

    @Test
    void testDeleteRegistration() {
        User user = userService.registerUser("testDeleteReg@example.com", "password123",
                "Test User", List.of("HR", "Finance"), "123456789", false, "Male");

        Optional<User> foundUser = userService.find(user.getEmail());
        if (foundUser.isPresent()) {
            user = foundUser.get();
        }

        Activity activity = new Activity("Cybersecurity Talk", "Introduction to Cybersecurity",
                "Not Accessible for PwD", false, 2, 30, 1, "Room B", 10.0f);

        activityService.save(activity);

        Registration registration = new Registration(user, activity, LocalDateTime.now(),
                List.of(Date.valueOf("2025-06-15")), "Pending", false);

        registration = registrationService.save(registration);

        registrationService.delete(registration.getId());

        Optional<Registration> deletedRegistration = registrationService.findById(registration.getId());
        assertFalse(deletedRegistration.isPresent());
    }
}
