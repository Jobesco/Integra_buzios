package com.cesar.integra.service;

import com.cesar.integra.model.Event;
import com.cesar.integra.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {
    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public Event save(Event event) {
        return eventRepository.save(event);
    }

    public Optional<Event> find(String name){
        return eventRepository.findByName(name);
    }

    public List<Event> findAll(){
        return eventRepository.findAll();
    }

    public void delete(String name){
        eventRepository.findByName(name);
    }
}
