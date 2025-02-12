package com.cesar.integra.model;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import java.sql.Date;
import java.sql.Time;

import static org.springframework.util.Assert.isTrue;
import static org.springframework.util.Assert.notNull;

@Getter
@Setter(AccessLevel.PRIVATE)
public class Group {
    private int id;
    private Event event;
    private Activity activity;
    private Date date;
    private Time time;
    private String status;

    /**To create new groups*/
    public Group(Event event, Activity activity, Date date, Time time, String status) {
        notNull(event, "Group event name cannot be null");
        notNull(activity, "Group activityTitle cannot be null");
        notNull(date, "Group date cannot be null");
        notNull(time, "Group time cannot be null");
        notNull(status, "Group status cannot be null");
        this.event = event;
        this.activity = activity;
        this.date = date;
        this.time = time;
        this.status = status;
    }

    /**To load groups*/
    public Group(int id, Event event, Activity activity, Date date, Time time, String status) {
        this(event, activity, date, time, status);
        isTrue(id > 0, "Group id must be greater than 0");
        this.id = id;
    }

}
