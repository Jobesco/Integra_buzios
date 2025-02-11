package model;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import static org.springframework.util.Assert.notNull;

@Getter()
@Setter(AccessLevel.PRIVATE)

public class Guide {
    private User user;
    private Group group;
    private String status;

    public Guide(User user, Group group, String status) {
        notNull(user, "Guide user cannot be null");
        notNull(group, "Guide group cannot be null");
        notNull(status, "Guide status cannot be null");
        this.user = user;
        this.group = group;
        this.status = status;
    }
}

