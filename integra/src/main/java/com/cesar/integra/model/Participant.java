package com.cesar.integra.model;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        notNull(group, "Participant group must not be null");
        this.group = group;
        this.registration = registration;
        this.user = user;
    }

    /**To load participants*/
    public Participant(int id, Group group, Registration registration, User user) {
        this(group, registration, user);
        isTrue(id > 0, "Participant id must be greater than 0");
        this.id = id;
    }

    public Map<String, Object> nameEmailAndGroup(){
        Map<String, Object> participantJson = new HashMap<>();
        if(this.user != null){
            participantJson.put("name", this.user.getName());
            participantJson.put("email", this.user.getEmail());
        }else{
            participantJson.put("name", this.registration.getUser().getName());
            participantJson.put("email", this.registration.getUser().getEmail());
        }
        participantJson.put("group", this.group.getId());
        return participantJson;
    }
}
