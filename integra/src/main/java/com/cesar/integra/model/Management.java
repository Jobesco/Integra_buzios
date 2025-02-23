package com.cesar.integra.model;

import lombok.Getter;
import lombok.Setter;

import static org.springframework.util.Assert.isTrue;
import static org.springframework.util.Assert.notNull;

@Getter
@Setter
public class Management {
    private int id;
    private String particle;
    private Management parent;

    public Management() {}

    /**To create new managements*/
    public Management(String particle, Management parent) {
        notNull(particle, "Management Particle must not be null");
        this.particle = particle;
        this.parent = parent;
    }

    /**To load managements*/
    public Management(int id, String particle, Management parent) {
        this(particle, parent);
        isTrue(id > 0, "Management id must be greater zero");
        this.id = id;
    }
}
