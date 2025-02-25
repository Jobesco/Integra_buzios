package com.cesar.integra.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FormEnabler {
    private static FormEnabler instance = new FormEnabler();

    private boolean guideForms;
    private boolean participantForms;

    private FormEnabler() {
        guideForms = false;
        participantForms = false;
    }

    public static FormEnabler getInstance() {
        if(instance == null) {
            instance = new FormEnabler();
        }

        return instance;
    }


}
