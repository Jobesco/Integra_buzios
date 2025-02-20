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
    private int hierarchy;
    private int parentId;

    public Management() {}

    /**To create new managements*/
    public Management(String particle, int hierarchy, int parentId) {
        notNull(particle, "Management Particle must not be null");
        isTrue(hierarchy > 0, "Management hierarchy must be greater zero");
        isTrue(parentId > 0, "Management parentId must be greater zero");
        this.particle = particle;
        this.hierarchy = hierarchy;
        this.parentId = parentId;
    }

    /**To load managements*/
    public Management(int id, String particle, int hierarchy, int parentId) {
        this(particle, hierarchy, parentId);
        isTrue(id > 0, "Management id must be greater zero");
        this.id = id;
    }
}
