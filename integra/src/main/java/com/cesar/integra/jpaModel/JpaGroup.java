package com.cesar.integra.jpaModel;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "Group_table")
public class JpaGroup implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "eventName", referencedColumnName = "name")
    private JpaEvent event;

    @ManyToOne
    @JoinColumn(name = "activityTitle", referencedColumnName = "title")
    private JpaActivity activity;

    @Column
    private LocalDateTime realizationDateTime;

    @Column
    private String status;

    @OneToMany(mappedBy = "group", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<JpaGuide> guides;

    @OneToMany(mappedBy = "group", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<JpaParticipant> participants;

    public JpaGroup() {

    }

}
