package model;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import java.time.LocalDateTime;
import static org.springframework.util.Assert.notNull;

@Getter
@Setter(AccessLevel.PRIVATE)
@ToString
public class Event {
    private String name;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    public Event(String name, LocalDateTime startDate, LocalDateTime endDate) {
        notNull(name, "Event name cannot be null");
        notNull(startDate, "Event start date cannot be null");
        notNull(endDate, "Event end date cannot be null");
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
