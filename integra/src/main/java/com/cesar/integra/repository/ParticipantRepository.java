package com.cesar.integra.repository;

import com.cesar.integra.model.Group;
import com.cesar.integra.model.Participant;
import com.cesar.integra.model.Registration;
import com.cesar.integra.model.User;

import java.util.List;
import java.util.Optional;

public interface ParticipantRepository {
    public Participant save(Participant participant);
    public Optional<Participant> findById(int id);
    public List<Participant> findAll();
    public List<User> findUsersInGroup(int groupId);
    public List<Participant> findParticipantsInGroup(int groupId);
    public void delete(int id);
}
