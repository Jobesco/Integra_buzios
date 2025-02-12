package com.cesar.integra.jpaModel;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.io.Serializable;
import java.sql.Date;
import java.sql.Time;

import com.cesar.integra.model.Event;
import com.cesar.integra.model.Activity;

@Getter
@Setter
@Entity
@Table(name = "Group")
public class JpaGroup implements Serializable {
    private static final long serialVersionUID = 1L;
    private Event event;
    private Activity activity;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String event_name = event.getName();

    @Column
    private String acticity_title = activity.getTitle();

    @Column
    private Date date;

    @Column
    private Time time;

    @Column String status;

    public JpaGroup() {

    }

}
