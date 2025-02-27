package com.cesar.integra.service;

import com.cesar.integra.model.Group;
import com.cesar.integra.model.Participant;
import com.cesar.integra.model.Registration;
import com.cesar.integra.model.User;
import com.cesar.integra.repository.ParticipantRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ParticipantService {
    private final ParticipantRepository participantRepository;

    public ParticipantService(ParticipantRepository participantRepository) {
        this.participantRepository = participantRepository;
    }

    public Participant save(Participant participant) {
        return participantRepository.save(participant);
    }

    public Optional<Participant> find(int id) {
        return participantRepository.findById(id);
    }

    public List<Participant> findAll() {
        return participantRepository.findAll();
    }

    public List<User> findUsersInGroup(int groupId) {
        return participantRepository.findUsersInGroup(groupId);
    }

    public List<Participant> findParticipantsInGroup(Group group) {
        return participantRepository.findParticipantsInGroup(group.getId());
    }

    public void delete(int id) {
        participantRepository.delete(id);
    }
}
