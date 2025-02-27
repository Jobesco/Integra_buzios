package com.cesar.integra.controller;

import com.cesar.integra.model.Activity;
import com.cesar.integra.model.Event;
import com.cesar.integra.service.ActivityService;
import com.cesar.integra.service.EventService;
import com.cesar.integra.util.NewEventRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/event")
public class EventController {
    @Autowired
    private EventService eventService;
    @Autowired
    private ActivityService activityService;

    @PostMapping("/newEvent")
    public ResponseEntity<Event> newEvent(@RequestBody NewEventRequest newEventRequest) {
        Optional.ofNullable(newEventRequest.getEvent())
                .filter(e -> e.getName() != null && !e.getName().trim().isEmpty())
                .orElseThrow(() -> new IllegalArgumentException("Event name cannot be null or empty"));

        Event savedEvent = eventService.save(newEventRequest.getEvent());

        if (newEventRequest.getActivityTitles() != null && !newEventRequest.getActivityTitles().isEmpty()) {
            activityService.reverseStatus(newEventRequest.getActivityTitles());
        }

        return ResponseEntity.ok(savedEvent);
    }

    @PutMapping("/endEvent/{eventName}")
    public ResponseEntity<Event> endEvent(@PathVariable String eventName) {
        Event event = eventService.endEvent(eventName);
        return ResponseEntity.ok(event);
    }

    @GetMapping("/{name}")
    public ResponseEntity<Event> getEvent(@PathVariable String name) {
        Optional<Event> event = eventService.find(name);
        return event.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        List<Event> events = eventService.findAll();
        return ResponseEntity.ok(events);
    }

    @GetMapping("/nameAndStatus")
    public ResponseEntity<List<Map<String, Object>>> getEventsNameAndStatus() {
        List<Map<String, Object>> events = eventService.findAll().stream()
                .map(Event::nameAndStatus)
                .toList();
        return ResponseEntity.ok(events);
    }

    @PutMapping("/{name}/edit")
    public ResponseEntity<Event> updateEvent(@PathVariable String name, @RequestBody Event event) {
        Optional.ofNullable(event)
                .filter(a -> a.getName() != null && !a.getName().trim().isEmpty())
                .orElseThrow(() -> new IllegalArgumentException("Activity title cannot be null or empty"));

        return eventService.find(name)
                .map(existingEvent -> {
                    eventService.save(event);
                    if(!event.getName().equals(existingEvent.getName())) {
                        eventService.delete(existingEvent.getName());
                    }
                    return ResponseEntity.ok(event);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<Event> deleteEvent(@PathVariable String name) {
        Optional<Event> existingEvent = eventService.find(name);

        if (existingEvent.isPresent()) {
            eventService.delete(name);
            return  ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.notFound().build();
        }
    }


}
