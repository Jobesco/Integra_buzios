package com.cesar.integra.serviceTests;

import com.cesar.integra.model.Activity;
import com.cesar.integra.model.Event;
import com.cesar.integra.model.Group;
import com.cesar.integra.service.ActivityService;
import com.cesar.integra.service.EventService;
import com.cesar.integra.service.GroupService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class GroupTest {
    @Autowired
    private GroupService groupService;

    @Autowired
    private ActivityService activityService;

    @Autowired
    private EventService eventService;

    @Test
    void testCreateGroup() {
        Event event = new Event("Tech Meetup", Date.valueOf("2025-06-01"),
                Date.valueOf("2025-06-10"), Date.valueOf("2025-07-01"),
                Date.valueOf("2025-07-10"), Date.valueOf("2025-08-01"),
                Date.valueOf("2025-08-10"));

        Activity activity = new Activity("Workshop", "AI Workshop", "Accessible for PwD",
                true, 3, 50, 2, "Main Hall", 20.0f);

        Group group = new Group(event, activity, LocalDateTime.now(), "Scheduled");

        eventService.save(event);
        activityService.save(activity);
        Group savedGroup = groupService.save(group);

        assertNotNull(savedGroup);
        assertEquals("Tech Meetup", savedGroup.getEvent().getName());

        Optional<Group> foundGroup = groupService.findById(savedGroup.getId());
        assertTrue(foundGroup.isPresent());
    }

    @Test
    void testUpdateGroupStatus() {
        Event event = new Event("Tech", Date.valueOf("2025-06-01"),
                Date.valueOf("2025-06-10"), Date.valueOf("2025-07-01"),
                Date.valueOf("2025-07-10"), Date.valueOf("2025-08-01"),
                Date.valueOf("2025-08-10"));

        Activity activity = new Activity("AI", "AI Workshop", "Accessible for PwD",
                true, 3, 50, 2, "Main Hall", 20.0f);

        Group group = new Group(event, activity, LocalDateTime.now(), "Scheduled");

        eventService.save(event);
        activityService.save(activity);
        group = groupService.save(group);

        Optional<Group> groupOpt = groupService.findById(group.getId());
        assertTrue(groupOpt.isPresent());

        Group updatedGroup = groupOpt.get();
        updatedGroup.setStatus("Completed");

        groupService.save(updatedGroup);

        Optional<Group> foundGroup = groupService.findById(group.getId());
        assertTrue(foundGroup.isPresent());
        assertEquals("Completed", foundGroup.get().getStatus());
    }

    @Test
    void testDeleteGroup() {
        Event event = new Event("Tech Meetup", Date.valueOf("2025-06-01"),
                Date.valueOf("2025-06-10"), Date.valueOf("2025-07-01"),
                Date.valueOf("2025-07-10"), Date.valueOf("2025-08-01"),
                Date.valueOf("2025-08-10"));

        Activity activity = new Activity("Workshop", "AI Workshop", "Accessible for PwD",
                true, 3, 50, 2, "Main Hall", 20.0f);

        Group group = new Group(event, activity, LocalDateTime.now(), "Scheduled");

        eventService.save(event);
        activityService.save(activity);
        group = groupService.save(group);

        groupService.delete(group.getId());

        Optional<Group> deletedGroup = groupService.findById(group.getId());
        assertFalse(deletedGroup.isPresent());
    }

}
