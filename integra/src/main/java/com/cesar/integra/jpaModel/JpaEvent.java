package com.cesar.integra.jpaModel;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.sql.Date;


@Getter
@Setter
@Entity
@Table(name = "Event")
public class JpaEvent{

    @Id
    private String name;

    @Column
    private Date guideFormStartDate;

    @Column
    private Date guideFormEndDate;

    @Column
    private Date participantFormStartDate;

    @Column
    private Date participantFormEndDate;

    @Column
    private Date realizationFormStartDate;

    @Column
    private Date realizationFormEndDate;

    public JpaEvent(){

    }

}
