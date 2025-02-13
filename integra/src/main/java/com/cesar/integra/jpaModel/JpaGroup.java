package com.cesar.integra.jpaModel;

import com.cesar.integra.model.Activity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "Group")
public class JpaGroup implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "eventId", referencedColumnName = "id")
    private JpaEvent event;

    @ManyToOne
    @JoinColumn(name = "activityId", referencedColumnName = "id")
    private JpaActivity activity;

    @Column
    private LocalDateTime realizationDateTime;

    @Column
    private String status;

    public JpaGroup() {

    }

}
