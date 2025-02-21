package com.cesar.integra.jpaModel;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "User")
public class JpaUser implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    private String email;

    @Column
    private String password;

    @Column
    private String name;

    @Column
    private String roles;

    @ManyToOne
    @JoinColumn(name = "managementId", referencedColumnName = "id", nullable = true)
    private JpaManagement management;

    @Column
    private String managementString;

    @Column
    private String phone;

    @Column
    private boolean pwd;

    @Column
    private String gender;
    
    @Column
    private boolean active;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<JpaGuide> guides;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<JpaRegistration> registrations;

    public JpaUser() {}

}
