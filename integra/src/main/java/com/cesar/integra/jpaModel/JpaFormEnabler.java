package com.cesar.integra.jpaModel;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "form_enabler")
public class JpaFormEnabler {
    @Id
    private Long id = 1L;

    private boolean guideForms;
    private boolean participantForms;

    public JpaFormEnabler() {}
}
