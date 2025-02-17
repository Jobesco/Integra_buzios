package com.cesar.integra.model;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;
import static org.springframework.util.Assert.isTrue;
import static org.springframework.util.Assert.notNull;

@Getter
@Setter
public class Group implements Serializable {
    private int id;
    private Event event;
    private Activity activity;
    private LocalDateTime realizationDateTime;
    private String status;

    public Group(){

    }

    /**To create new groups*/
    public Group(Event event, Activity activity, LocalDateTime realizationDateTime, String status) {
        notNull(event, "Group event name cannot be null");
        notNull(activity, "Group activityTitle cannot be null");
        notNull(realizationDateTime, "Group dateTime cannot be null");
        notNull(status, "Group status cannot be null");
        this.event = event;
        this.activity = activity;
        this.realizationDateTime = realizationDateTime;
        this.status = status;
    }

    /**To load groups*/
    public Group(int id, Event event, Activity activity, LocalDateTime realizationDateTime, String status) {
        this(event, activity, realizationDateTime, status);
        isTrue(id > 0, "Group id must be greater than 0");
        this.id = id;
    }

}
