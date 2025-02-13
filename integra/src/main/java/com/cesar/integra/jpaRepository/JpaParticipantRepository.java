package com.cesar.integra.jpaRepository;

import com.cesar.integra.jpaModel.JpaParticipant;
import com.cesar.integra.mapper.ParticipantMapper;
import com.cesar.integra.model.Participant;
import com.cesar.integra.repository.ParticipantRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.springframework.util.Assert.isTrue;
import static org.springframework.util.Assert.notNull;

public class JpaParticipantRepository implements ParticipantRepository {
    private final JpaParticipantRepositoryDefault jpaParticipantRepositoryDefault;

    public JpaParticipantRepository(JpaParticipantRepositoryDefault jpaParticipantRepositoryDefault) {
        this.jpaParticipantRepositoryDefault = jpaParticipantRepositoryDefault;
    }

    @Override
    public Participant save(Participant participant) {
        notNull(participant, "Participant must not be null");

        JpaParticipant jpaParticipant = ParticipantMapper.toJpaParticipant(participant);
        JpaParticipant savedParticipant = jpaParticipantRepositoryDefault.save(jpaParticipant);

        return ParticipantMapper.toParticipant(savedParticipant);
    }

    @Override
    public Optional<Participant> findById(int id) {
        isTrue(id > 0, "Id must be grater than 0");

        return jpaParticipantRepositoryDefault.findById(id)
                .map(ParticipantMapper::toParticipant);
    }

    @Override
    public List<Participant> findAll() {
        return jpaParticipantRepositoryDefault.findAll().stream()
                .map(ParticipantMapper::toParticipant)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(int id) {
        jpaParticipantRepositoryDefault.deleteById(id);
    }
}
