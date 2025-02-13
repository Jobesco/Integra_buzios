package com.cesar.integra.jpaModel;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.io.Serializable;


@Getter
@Setter
@Entity
@Table(name = "Guide")
public class JpaGuide implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "userEmail", referencedColumnName = "email")
    private JpaUser user;

    @ManyToOne
    @JoinColumn(name = "groupId", referencedColumnName = "id")
    private JpaGroup group;

    @Column
    private String availableDays;

    @Column
    private String status;

    public JpaGuide(){

    }

}
