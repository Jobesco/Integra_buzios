package com.cesar.integra.jpaModel;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "Group_table")
public class JpaGroup implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "eventName", referencedColumnName = "name")
    private JpaEvent event;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "activityTitle", referencedColumnName = "title")
    private JpaActivity activity;

    @Column
    private LocalDateTime realizationDateTime;

    @Column
    private String status;

    public JpaGroup() {

    }

}
