package com.cesar.integra.mapper;

import com.cesar.integra.jpaModel.JpaParticipant;
import com.cesar.integra.model.Participant;

import java.util.Optional;

import static org.springframework.util.Assert.notNull;

public class ParticipantMapper {

    public static JpaParticipant toJpaParticipant(Participant participant) {
        notNull(participant, "participant must not be null");
        JpaParticipant jpaParticipant = new JpaParticipant();

        jpaParticipant.setId(participant.getId());
        jpaParticipant.setGroup(GroupMapper.toJpaGroup(participant.getGroup()));
        jpaParticipant.setRegistration(
                Optional.ofNullable(participant.getRegistration())
                        .map(RegistrationMapper::toJpaRegistration)
                        .orElse(null)
        );

        jpaParticipant.setUser(
                Optional.ofNullable(participant.getUser())
                        .map(UserMapper::toJpaUser)
                        .orElse(null)
        );

        return jpaParticipant;
    }

    public static Participant toParticipant(JpaParticipant jpaParticipant) {
        notNull(jpaParticipant, "jpaParticipant must not be null");

        return new Participant(
                jpaParticipant.getId(),
                GroupMapper.toGroup(jpaParticipant.getGroup()),
                Optional.ofNullable(jpaParticipant.getRegistration())
                        .map(RegistrationMapper::toRegistration)
                        .orElse(null),
                Optional.ofNullable(jpaParticipant.getUser())
                        .map(UserMapper::toUser)
                        .orElse(null)
        );
    }
}
