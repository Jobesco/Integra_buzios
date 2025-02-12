package com.cesar.integra.model;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;
import java.sql.Date;

import static org.springframework.util.Assert.notNull;

@Getter
@Setter(AccessLevel.PRIVATE)
@ToString
public class Event implements Serializable {
    private String name;
    private Date guideFormStartDate;
    private Date guideFormEndDate;
    private Date participantFormStartDate;
    private Date participantFormEndDate;
    private Date realizationStartDate;
    private Date realizationEndDate;

    public Event(String name, Date guideFormStartDate, Date guideFormEndDate,
                 Date participantFormStartDate, Date participantFormEndDate,
                 Date realizationStartDate, Date realizationEndDate) {
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
