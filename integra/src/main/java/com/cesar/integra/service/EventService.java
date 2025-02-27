package com.cesar.integra.service;

import com.cesar.integra.model.Event;
import com.cesar.integra.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {
    private final EventRepository eventRepository;
    private final GroupService groupService;

    public EventService(EventRepository eventRepository, GroupService groupService) {
        this.eventRepository = eventRepository;
        this.groupService = groupService;
    }

    public Event save(Event event) {
        return eventRepository.save(event);
    }

    public Event endEvent(String eventName) {
        Optional<Event> foundEvent = eventRepository.findByName(eventName);

        if (foundEvent.isPresent()) {
            Event event = foundEvent.get();
            event.setActive(false);
            groupService.endGroupsInEvent(eventName);
            return eventRepository.save(event);
        }

        return null;
    }

    public Optional<Event> find(String name){
        return eventRepository.findByName(name);
    }

    public List<Event> findAll(){
        return eventRepository.findAll();
    }

    public void delete(String name){
        eventRepository.delete(name);
    }
}
