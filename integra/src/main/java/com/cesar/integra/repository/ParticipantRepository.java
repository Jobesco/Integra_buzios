package com.cesar.integra.repository;

import com.cesar.integra.model.Group;
import com.cesar.integra.model.Participant;
import com.cesar.integra.model.Registration;
import java.util.List;

public interface ParticipantRepository {
    public Participant save(Participant participant);
    public Participant findParticipant(Group group, Registration registration);
    public List<Participant> findAll();
    public Participant delete(Participant participant);
}
