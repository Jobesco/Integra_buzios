package com.cesar.integra.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import java.io.Serializable;
import java.time.LocalDate;

import static org.springframework.util.Assert.notNull;

@Getter
@Setter
@ToString
public class Event implements Serializable {
    private String name;
    private LocalDate guideFormStartDate;
    private LocalDate guideFormEndDate;
    private LocalDate participantFormStartDate;
    private LocalDate participantFormEndDate;
    private LocalDate realizationStartDate;
    private LocalDate realizationEndDate;

    public Event(){

    }

    public Event(String name, LocalDate guideFormStartDate, LocalDate guideFormEndDate,
                 LocalDate participantFormStartDate, LocalDate participantFormEndDate,
                 LocalDate realizationStartDate, LocalDate realizationEndDate) {
        notNull(name, "Event name cannot be null");
        notNull(guideFormStartDate, "Event guideFormStartDate cannot be null");
        notNull(guideFormEndDate, "Event guideFormEndDate cannot be null");
        notNull(participantFormStartDate, "Event participantFormStartDate cannot be null");
        notNull(participantFormEndDate, "Event participantFormEndDate cannot be null");
        notNull(realizationStartDate, "Event realizationStartDate cannot be null");
        notNull(realizationEndDate, "Event realizationEndDate cannot be null");
        this.name = name;
        this.guideFormStartDate = guideFormStartDate;
        this.guideFormEndDate = guideFormEndDate;
        this.participantFormStartDate = participantFormStartDate;
        this.participantFormEndDate = participantFormEndDate;
        this.realizationStartDate = realizationStartDate;
        this.realizationEndDate = realizationEndDate;
    }
}
