package com.cesar.integra.model;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
import java.util.List;

import static org.springframework.util.Assert.isTrue;
import static org.springframework.util.Assert.notNull;

@Getter
@Setter
public class Guide {
    private int id;
    private User user;
    private Group group;
    private List<LocalDate> availableDays;
    private String status;

    public Guide() {}

    /**To create new guides*/
    public Guide(User user, Group group, String status, List<LocalDate> availableDays) {
        notNull(user, "Guide user cannot be null");
        notNull(group, "Guide group cannot be null");
        notNull(status, "Guide status cannot be null");
        this.user = user;
        this.group = group;
        this.status = status;
        this.availableDays = availableDays;
    }

    /**To load guides*/
    public Guide(int id, User user, Group group, String status, List<LocalDate> availableDays) {
        this(user, group, status, availableDays);
        isTrue(id > 0, "Guide id must be greater than 0");
        this.id = id;
    }
}

