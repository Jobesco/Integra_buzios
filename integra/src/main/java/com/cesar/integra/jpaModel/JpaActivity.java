package com.cesar.integra.jpaModel;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.io.Serializable;

@Getter
@Setter
@Entity
@Table (name = "Activity")
public class JpaActivity implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    private String title;

    @Column
    private String description;

    @Column
    private String pwdDescription;

    @Column
    private boolean pwdPriority;

    @Column
    private int effortLevel;

    @Column
    private int tickets;

    @Column
    private int guidesNumber;

    @Column
    private String place;

    @Column
    private float cost;

    public JpaActivity() {

    }

}