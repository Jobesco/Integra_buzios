package com.cesar.integra.util;
import com.cesar.integra.model.Event;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class NewEventRequest {
    private Event event;
    private List<String> activityTitles;
}
