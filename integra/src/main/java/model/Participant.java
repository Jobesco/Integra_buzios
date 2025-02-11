package model;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import static org.springframework.util.Assert.notNull;

@Getter
@Setter(AccessLevel.PRIVATE)
public class Participant {
    private Group group;
    private Registration registration;

    public Participant(Group group, Registration registration) {
        notNull(group, "Participant group cannot be null");
        notNull(registration, "Participant registration cannot be null");
        this.group = group;
        this.registration = registration;
    }
}
