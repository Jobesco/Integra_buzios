package com.cesar.integra.model;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
public class GroupDTO {
    private String eventName;
    private String activityTitle;
    private LocalDateTime realizationDateTime;
    private String status;
}
