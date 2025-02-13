package com.cesar.integra.mapper;

import com.cesar.integra.jpaModel.JpaEvent;
import com.cesar.integra.model.Event;

import static org.springframework.util.Assert.notNull;

public class EventMapper {

    public static JpaEvent toJpaEvent(Event event) {
        notNull(event, "Event must not be null");
        JpaEvent jpaEvent = new JpaEvent();

        jpaEvent.setName(event.getName());
        jpaEvent.setGuideFormStartDate(event.getGuideFormStartDate());
        jpaEvent.setGuideFormEndDate(event.getGuideFormEndDate());
        jpaEvent.setParticipantFormStartDate(event.getParticipantFormStartDate());
        jpaEvent.setParticipantFormEndDate(event.getParticipantFormEndDate());
        jpaEvent.setRealizationFormStartDate(event.getRealizationStartDate());
        jpaEvent.setRealizationFormEndDate(event.getRealizationEndDate());

        return jpaEvent;
    }

    public static Event toEvent(JpaEvent jpaEvent) {
        notNull(jpaEvent, "JpaEvent must not be null");

        return new Event(
                jpaEvent.getName(),
                jpaEvent.getGuideFormStartDate(),
                jpaEvent.getGuideFormEndDate(),
                jpaEvent.getParticipantFormStartDate(),
                jpaEvent.getParticipantFormEndDate(),
                jpaEvent.getRealizationFormStartDate(),
                jpaEvent.getRealizationFormEndDate()
        );
    }
}
