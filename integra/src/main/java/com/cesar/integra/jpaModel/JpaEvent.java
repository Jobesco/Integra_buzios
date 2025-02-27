package com.cesar.integra.jpaModel;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
import java.util.List;


@Getter
@Setter
@Entity
@Table(name = "Event")
public class JpaEvent{

    @Id
    private String name;

    @Column
    private boolean active;

    @Column
    private LocalDate guideFormStartDate;

    @Column
    private LocalDate guideFormEndDate;

    @Column
    private LocalDate participantFormStartDate;

    @Column
    private LocalDate participantFormEndDate;

    @Column
    private LocalDate realizationFormStartDate;

    @Column
    private LocalDate realizationFormEndDate;

    @OneToMany(mappedBy = "event", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<JpaGroup> groups;

    public JpaEvent(){

    }

}
