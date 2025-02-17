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
public class ParticipantTest {
    @Autowired
    private ParticipantService participantService;

    @Autowired
    private UserService userService;

    @Autowired
    private GroupService groupService;

    @Autowired
    private ActivityService activityService;

    @Autowired
    private RegistrationService registrationService;

    @Test
    void testCreateParticipant() {
        User user = userService.registerUser("testParticipant@example.com", "password123",
                "Test User", List.of("HR", "Finance"), "123456789", false, "Male");

        Optional<User> foundUser = userService.find(user.getEmail());
        if (foundUser.isPresent()) {
            user = foundUser.get();
        }

        Activity activity = new Activity("Coding", "Java Bootcamp", "Accessible for PwD",
                true, 3, 50, 2, "Room 303", 25.0f);
        activityService.save(activity);

        Group group = new Group(null, activity, LocalDateTime.now(), "Scheduled");
        group = groupService.save(group);

        Registration registration = new Registration(user, activity, LocalDateTime.now(),
                List.of(Date.valueOf("2025-06-05")), "Pending", false);
        registration = registrationService.save(registration);

        Participant participant = new Participant(group, registration);
        Participant savedParticipant = participantService.save(participant);

        assertNotNull(savedParticipant);
        assertEquals(group.getId(), savedParticipant.getGroup().getId());
        assertEquals(registration.getId(), savedParticipant.getRegistration().getId());

        Optional<Participant> foundParticipant = participantService.find(savedParticipant.getId());
        assertTrue(foundParticipant.isPresent());
    }

    @Test
    void testDeleteParticipant() {
        User user = userService.registerUser("testDeleteParticipant@example.com", "password123",
                "Test User", List.of("HR", "Finance"), "123456789", false, "Male");

        Optional<User> foundUser = userService.find(user.getEmail());
        if (foundUser.isPresent()) {
            user = foundUser.get();
        }

        Activity activity = new Activity("Data Science", "Python for Data", "Accessible for PwD",
                true, 3, 50, 2, "Room 404", 30.0f);
        activityService.save(activity);

        Group group = new Group(null, activity, LocalDateTime.now(), "Scheduled");
        group = groupService.save(group);

        Registration registration = new Registration(user, activity, LocalDateTime.now(),
                List.of(Date.valueOf("2025-06-10")), "Pending", false);
        registration = registrationService.save(registration);

        Participant participant = new Participant(group, registration);
        participant = participantService.save(participant);

        participantService.delete(participant.getId());

        Optional<Participant> deletedParticipant = participantService.find(participant.getId());
        assertFalse(deletedParticipant.isPresent());
    }
}
