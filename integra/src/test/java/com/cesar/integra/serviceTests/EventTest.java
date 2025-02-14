package com.cesar.integra.serviceTests;

import com.cesar.integra.model.Event;
import com.cesar.integra.repository.EventRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import java.sql.Date;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class EventTest {
    @Autowired
    private EventRepository eventRepository;

    @Test
    void testSaveAndFindEvent() {
        Event event = new Event("Tech Meetup", Date.valueOf("2025-06-01"),
                Date.valueOf("2025-06-10"), Date.valueOf("2025-07-01"),
                Date.valueOf("2025-07-10"), Date.valueOf("2025-08-01"),
                Date.valueOf("2025-08-10"));

        eventRepository.save(event);

        Optional<Event> foundEvent = eventRepository.findByName(event.getName());

        assertTrue(foundEvent.isPresent());
        assertEquals("Tech Meetup", foundEvent.get().getName());
    }

    @Test
    void testUpdateEvent() {
        Event event = new Event("Tech Meetup",
                Date.valueOf("2025-06-01"), Date.valueOf("2025-06-10"),
                Date.valueOf("2025-07-01"), Date.valueOf("2025-07-10"),
                Date.valueOf("2025-08-01"), Date.valueOf("2025-08-10"));

        Event savedEvent = eventRepository.save(event);

        savedEvent.setName("Tech Conference");
        eventRepository.save(savedEvent);

        Optional<Event> updatedEvent = eventRepository.findByName("Tech Conference");

        assertTrue(updatedEvent.isPresent());
        assertEquals("Tech Conference", updatedEvent.get().getName());
    }

    @Test
    void testDeleteEvent() {
        Event event = new Event("Meetup",
                Date.valueOf("2025-06-01"), Date.valueOf("2025-06-10"),
                Date.valueOf("2025-07-01"), Date.valueOf("2025-07-10"),
                Date.valueOf("2025-08-01"), Date.valueOf("2025-08-10"));

        Event savedEvent = eventRepository.save(event);

        Optional<Event> foundEvent = eventRepository.findByName(savedEvent.getName());
        assertTrue(foundEvent.isPresent());

        eventRepository.delete(foundEvent.get().getName());

        Optional<Event> deletedEvent = eventRepository.findByName("Meetup");

        assertFalse(deletedEvent.isPresent());
    }
}
