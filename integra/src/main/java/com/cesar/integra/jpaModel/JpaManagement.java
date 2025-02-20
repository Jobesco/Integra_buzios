package com.cesar.integra.jpaModel;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "Management")
public class JpaManagement implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    private int id;

    @Column
    private String particle;

    @Column
    private int hierarchy;

    @ManyToOne
    @JoinColumn(name = "parentId", referencedColumnName = "id")
    private JpaManagement parentId;

    @OneToMany(mappedBy = "management", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<JpaManagement> children;

    @OneToMany(mappedBy = "management", cascade = CascadeType.ALL)
    private List<JpaUser> users;
}
