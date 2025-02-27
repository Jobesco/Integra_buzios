package com.cesar.integra.util;

import com.cesar.integra.model.Group;
import com.cesar.integra.model.Participant;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class SelectedGroup {
    private Group group;
    private List<Map<String, Object>> participants;
}
