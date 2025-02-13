package com.cesar.integra.jpaModel;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@Entity
@Table(name = "Participant")
public class JpaParticipant implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "groupId", referencedColumnName = "id")
    private JpaGroup group;

    @ManyToOne
    @JoinColumn(name = "registrationId", referencedColumnName = "id")
    private JpaRegistration registration;

    public JpaParticipant() {

    }

}
