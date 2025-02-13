package com.cesar.integra.jpaRepository;

import com.cesar.integra.jpaModel.JpaEvent;
import com.cesar.integra.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface JpaEventRepositoryDefault extends JpaRepository<JpaEvent, String> {
    public Optional<JpaEvent> findByName(String name);
}
