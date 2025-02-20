package com.cesar.integra.jpaModel;

import com.cesar.integra.model.Activity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "Registration")
public class JpaRegistration implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "userEmail", referencedColumnName = "email")
    private JpaUser user;

    @ManyToOne
    @JoinColumn(name = "activityTitle", referencedColumnName = "title")
    private JpaActivity activity;

    @Column
    private LocalDateTime registrationDateTime;

    @Column
    private String availableDays;

    @Column
    private String status;

    @Column
    private boolean onVacation;

    @OneToMany(mappedBy = "registration", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<JpaParticipant> participants;

    public JpaRegistration() {

    }

}
