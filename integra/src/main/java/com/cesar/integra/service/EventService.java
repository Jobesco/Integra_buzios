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
    private final RegistrationService registrationService;

    public EventService(EventRepository eventRepository, GroupService groupService, RegistrationService registrationService) {
        this.eventRepository = eventRepository;
        this.groupService = groupService;
        this.registrationService = registrationService;
    }

    public Event save(Event event) {
        return eventRepository.save(event);
    }

    public Event endEvent(String eventName) {
        Optional<Event> foundEvent = eventRepository.findByName(eventName);

        if (foundEvent.isPresent()) {
            Event event = foundEvent.get();
            event.setActive(false);
            Event savedEvent = eventRepository.save(event);
            groupService.endGroupsInEvent();
            registrationService.endRegistration();
            return savedEvent;
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
