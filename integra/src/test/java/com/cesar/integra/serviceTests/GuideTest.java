package com.cesar.integra.serviceTests;

import com.cesar.integra.model.*;
import com.cesar.integra.service.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class GuideTest {
    @Autowired
    private GuideService guideService;

    @Autowired
    private UserService userService;

    @Autowired
    private GroupService groupService;

    @Autowired
    private ActivityService activityService;

    @Autowired
    private EventService eventService;

    @Test
    void testCreateGuide() {
        User user = userService.registerUser("testCreate@example.com", "password123",
                "Test User", List.of("HR", "Finance"), "123456789", false, "Male");

        Optional<User> foundUser = userService.find(user.getEmail());

        if(foundUser.isPresent()) {
            user = foundUser.get();
        }

        Event event = new Event("Tech Meetup", Date.valueOf("2025-06-01"),
                Date.valueOf("2025-06-10"), Date.valueOf("2025-07-01"),
                Date.valueOf("2025-07-10"), Date.valueOf("2025-08-01"),
                Date.valueOf("2025-08-10"));

        Activity activity = new Activity("Workshop", "AI Workshop", "Accessible for PwD",
                true, 3, 50, 2, "Main Hall", 20.0f);

        Group group = new Group(event, activity, java.time.LocalDateTime.now(), "Scheduled");

        eventService.save(event);
        activityService.save(activity);
        group = groupService.save(group);

        Guide guide = new Guide(user, group, "Active", List.of(Date.valueOf("2025-06-05")));

        Guide savedGuide = guideService.save(guide);

        assertNotNull(savedGuide);
        assertEquals("testCreate@example.com", savedGuide.getUser().getEmail());

        Optional<Guide> foundGuide = guideService.find(savedGuide.getId());
        assertTrue(foundGuide.isPresent());
    }

    @Test
    void testUpdateGuideStatus() {
        User user = userService.registerUser("testUpdate@example.com", "password123",
                "Test User", List.of("HR", "Finance"), "123456789", false, "Male");

        Optional<User> foundUser = userService.find(user.getEmail());

        if(foundUser.isPresent()) {
            user = foundUser.get();
        }

        Event event = new Event("Tech Event", LocalDate.("2025-06-01"),
                Date.valueOf("2025-06-10"), Date.valueOf("2025-07-01"),
                Date.valueOf("2025-07-10"), Date.valueOf("2025-08-01"),
                Date.valueOf("2025-08-10"));

        Activity activity = new Activity("Coding", "Java Workshop", "Accessible for PwD",
                true, 3, 50, 2, "Room A", 15.0f);

        Group group = new Group(event, activity, java.time.LocalDateTime.now(), "Scheduled");

        eventService.save(event);
        activityService.save(activity);
        group = groupService.save(group);

        Guide guide = new Guide(user, group, "Active", List.of(Date.valueOf("2025-06-10")));

        guide = guideService.save(guide);

        Optional<Guide> guideOpt = guideService.find(guide.getId());
        assertTrue(guideOpt.isPresent());

        Guide updatedGuide = guideOpt.get();
        updatedGuide.setStatus("Inactive");

        guideService.save(updatedGuide);

        Optional<Guide> foundGuide = guideService.find(guide.getId());
        assertTrue(foundGuide.isPresent());
        assertEquals("Inactive", foundGuide.get().getStatus());
    }

    @Test
    void testDeleteGuide() {
        User user = userService.registerUser("testDelete@example.com", "password123",
                "Test User", List.of("HR", "Finance"), "123456789", false, "Male");

        Optional<User> foundUser = userService.find(user.getEmail());

        if(foundUser.isPresent()) {
            user = foundUser.get();
        }

        Event event = new Event("Tech Summit", Date.valueOf("2025-06-15"),
                Date.valueOf("2025-06-20"), Date.valueOf("2025-07-10"),
                Date.valueOf("2025-07-20"), Date.valueOf("2025-08-10"),
                Date.valueOf("2025-08-20"));

        Activity activity = new Activity("Security", "Cybersecurity Talk", "Not Accessible for PwD",
                false, 2, 30, 1, "Room B", 10.0f);

        Group group = new Group(event, activity, java.time.LocalDateTime.now(), "Scheduled");

        eventService.save(event);
        activityService.save(activity);
        group = groupService.save(group);

        Guide guide = new Guide(user, group, "Active", List.of(Date.valueOf("2025-06-15")));

        guide = guideService.save(guide);

        guideService.delete(guide.getId());

        Optional<Guide> deletedGuide = guideService.find(guide.getId());
        assertFalse(deletedGuide.isPresent());
}
}
