package com.cesar.integra.service;

import com.cesar.integra.model.Group;
import com.cesar.integra.model.Participant;
import com.cesar.integra.model.Registration;
import com.cesar.integra.repository.ParticipantRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParticipantService {
    private final ParticipantRepository participantRepository;

    public ParticipantService(ParticipantRepository participantRepository) {
        this.participantRepository = participantRepository;
    }

    public Participant save(Participant participant) {
        return participantRepository.save(participant);
    }

    public Participant find(Group group, Registration registration) {
        return participantRepository.findParticipant(group, registration);
    }

    public List<Participant> findAll() {
        return participantRepository.findAll();
    }

    public Participant delete(Participant participant) {
        return participantRepository.delete(participant);
    }
}
