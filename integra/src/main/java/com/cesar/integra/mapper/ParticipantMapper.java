package com.cesar.integra.mapper;

import com.cesar.integra.jpaModel.JpaParticipant;
import com.cesar.integra.model.Participant;

import static org.springframework.util.Assert.notNull;

public class ParticipantMapper {

    public static JpaParticipant toJpaParticipant(Participant participant) {
        notNull(participant, "participant must not be null");
        JpaParticipant jpaParticipant = new JpaParticipant();

        jpaParticipant.setId(participant.getId());
        jpaParticipant.setGroup(GroupMapper.toJpaGroup(participant.getGroup()));
        jpaParticipant.setRegistration(RegistrationMapper.toJpaRegistration(participant.getRegistration()));
        jpaParticipant.setUser(UserMapper.toJpaUser(participant.getUser()));

        return jpaParticipant;
    }

    public static Participant toParticipant(JpaParticipant jpaParticipant) {
        notNull(jpaParticipant, "jpaParticipant must not be null");

        return new Participant(
                jpaParticipant.getId(),
                GroupMapper.toGroup(jpaParticipant.getGroup()),
                RegistrationMapper.toRegistration(jpaParticipant.getRegistration()),
                UserMapper.toUser(jpaParticipant.getUser())
        );
    }
}
