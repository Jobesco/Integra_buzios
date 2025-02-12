package com.cesar.integra.jpaModel;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.io.Serializable;
import com.cesar.integra.model.User;
import com.cesar.integra.model.Group;

@Getter
@Setter
@Entity
@Table (name = "Guide")

public class JpaGuide implements Serializable {
    private static final long serialVersionUID = 1L;
    private User user;
    private Group group;



}
