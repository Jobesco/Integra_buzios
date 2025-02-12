package com.cesar.integra.repository;

import com.cesar.integra.model.Event;
import java.util.List;

public interface EventRepository {
    public Event save(Event event);
    public Event findEventByName(String name);
    public List<Event> findAll();
    public Event delete(String name);
}
