package com.cesar.integra.service;

import com.cesar.integra.model.Event;
import com.cesar.integra.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {
    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public Event save(Event event) {
        return eventRepository.save(event);
    }

    public Event find(String name){
        return eventRepository.findEventByName(name);
    }

    public List<Event> findAll(){
        return eventRepository.findAll();
    }

    public Event delete(String name){
        return eventRepository.findEventByName(name);
    }
}
