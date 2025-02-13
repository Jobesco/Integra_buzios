package com.cesar.integra.jpaModel;

import com.cesar.integra.model.Activity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.io.Serializable;
import java.time.LocalDateTime;

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
    @JoinColumn(name = "userID", referencedColumnName = "id")
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

    public JpaRegistration() {

    }

}
