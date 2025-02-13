package com.cesar.integra.model;

import java.io.Serializable;
import java.util.List;
import lombok.AccessLevel;
import lombok.Setter;
import lombok.Getter;
import static org.springframework.util.Assert.notNull;

@Getter
@Setter(AccessLevel.PRIVATE)
public class User implements Serializable {
    private String email;
    private String password;
    private String name;
    private List<String> management;
    private String phone;
    private boolean pwd;
    private String gender;

    public User(String email, String password){
        this.email = email;
        this.password = password;
    }

    public User(String email, String password, String name, List<String> management,
                String phone, boolean pwd, String gender) {
        notNull(email, "User email cannot be null");
        notNull(password, "User password cannot be null");
        notNull(name, "User name cannot be null");
        notNull(management, "User management cannot be null");
        notNull(phone, "User phone cannot be null");
        notNull(gender, "User gender cannot be null");
        this.email = email;
        this.password = password;
        this.name = name;
        this.management = management;
        this.phone = phone;
        this.pwd = pwd;
        this.gender = gender;
    }

    public void addMangements(List<String> managements){
        notNull(managements, "management cannot be null");
        for(String management : managements){
            this.management.add(management);
        }
    }

    public void removeMangements(List<String> managements){
        notNull(managements, "management cannot be null");
        for(String management : managements){
            this.management.remove(management);
        }
    }

    @Override
    public String toString() {
        return String.format("Name: %s, Email: %s, PwD: %s, Gender: %s", name, email, isPwd(), gender);
    }
}
