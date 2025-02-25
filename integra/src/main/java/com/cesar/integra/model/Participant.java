package com.cesar.integra.model;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import static org.springframework.util.Assert.isTrue;
import static org.springframework.util.Assert.notNull;

@Getter
@Setter
public class Participant {
    private int id;
    private Group group;
    private Registration registration;
    private User user;

    public Participant() {}

    /**To create new participants*/
    public Participant(Group group, Registration registration, User user) {
        notNull(group, "Participant group cannot be null");
        this.group = group;
        this.registration = registration;
        this.user = user;
    }

    /**To load participants*/
    public Participant(int id, Group group, Registration registration, User user) {
        this(group, registration, user);
        isTrue(id >= 0, "Participant id cannot be negative");
        this.id = id;
    }
}
