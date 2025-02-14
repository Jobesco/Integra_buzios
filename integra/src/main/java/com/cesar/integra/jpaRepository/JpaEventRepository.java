package com.cesar.integra.jpaRepository;

import com.cesar.integra.jpaModel.JpaEvent;
import com.cesar.integra.mapper.EventMapper;
import com.cesar.integra.model.Event;
import com.cesar.integra.repository.EventRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import static org.springframework.util.Assert.notNull;

@Repository
public class JpaEventRepository implements EventRepository {

    private final JpaEventRepositoryDefault jpaEventRepositoryDefault;

    public JpaEventRepository(JpaEventRepositoryDefault jpaEventRepositoryDefault) {
        this.jpaEventRepositoryDefault = jpaEventRepositoryDefault;
    }

    @Override
    public Event save(Event event) {
        notNull(event, "Event cannot be null");

        JpaEvent jpaEvent = EventMapper.toJpaEvent(event);
        JpaEvent savedEvent = jpaEventRepositoryDefault.save(jpaEvent);

        return EventMapper.toEvent(savedEvent);
    }

    @Override
    public Optional<Event> findByName(String name) {
        notNull(name, "Event name cannot be null");

        return jpaEventRepositoryDefault.findByName(name)
                .map(EventMapper::toEvent);
    }

    @Override
    public List<Event> findAll() {
        return jpaEventRepositoryDefault.findAll().stream()
                .map(EventMapper::toEvent)
                .toList();
    }

    @Override
    public void delete(String name) {
        notNull(name, "Event name cannot be null");

        jpaEventRepositoryDefault.deleteById(name);
    }
}
