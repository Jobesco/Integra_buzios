package com.cesar.integra.model;

import lombok.Getter;
import lombok.Setter;

import static org.springframework.util.Assert.notNull;

@Getter
@Setter
public class Topic {
    private int id;
    private String title;

    public Topic() {}

    /**To create new Topics*/
    public Topic(String title) {
        notNull(title, "Title must not be null");
        this.title = title;
    }

    /**To load Topics*/
    public Topic(int id, String title) {
        this(title);
        notNull(id, "ID must not be null");
        this.id = id;
    }
}
