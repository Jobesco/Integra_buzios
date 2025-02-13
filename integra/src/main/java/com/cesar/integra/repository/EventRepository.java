package com.cesar.integra.repository;

import com.cesar.integra.model.Event;
import java.util.List;
import java.util.Optional;

public interface EventRepository {
    public Event save(Event event);
    public Optional<Event> findByName(String name);
    public List<Event> findAll();
    public void delete(String name);
}
