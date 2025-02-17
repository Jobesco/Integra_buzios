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

    public Participant() {}

    /**To create new participants*/
    public Participant(Group group, Registration registration) {
        notNull(group, "Participant group cannot be null");
        notNull(registration, "Participant registration cannot be null");
        this.group = group;
        this.registration = registration;
    }

    /**To load participants*/
    public Participant(int id, Group group, Registration registration) {
        this(group, registration);
        isTrue(id >= 0, "Participant id cannot be negative");
        this.id = id;
    }
}
