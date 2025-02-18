package com.cesar.integra.model;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import lombok.AccessLevel;
import lombok.Setter;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import static org.springframework.util.Assert.notNull;

@Getter
@Setter
public class User implements Serializable{
    private String email;
    @Setter(AccessLevel.PRIVATE)
    private String password;
    private String name;
    private List<String> management;
    private String phone;
    private boolean pwd;
    private String gender;
    private Boolean active;

    public User() {}

    public User(String email, String name, List<String> management,
                String phone, boolean pwd, String gender, boolean active) {
        notNull(email, "User email cannot be null");
        notNull(name, "User name cannot be null");
        notNull(management, "User management cannot be null");
        notNull(phone, "User phone cannot be null");
        notNull(gender, "User gender cannot be null");
        this.email = email;
        this.name = name;
        this.management = management;
        this.phone = phone;
        this.pwd = pwd;
        this.gender = gender;
        this.active = active;
    }

    public User(String email, String password, String name, List<String> management,
                String phone, boolean pwd, String gender) {
        notNull(email, "User email cannot be null");
        notNull(name, "User name cannot be null");
        notNull(password, "User password cannot be null");
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

    public User(String email, String password, String name, List<String> management,
                String phone, boolean pwd, String gender, boolean active) {
        this(email, name, management, phone, pwd, gender, active);
        notNull(password, "User password cannot be null");
        this.password = password;
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

    public void setEncodedPassword(String encodedPassword) {
        notNull(encodedPassword, "Password cannot be null");
        this.password = encodedPassword;
    }

    @Override
    public String toString() {
        return String.format("Name: %s, Email: %s, PwD: %s, Gender: %s", name, email, isPwd(), gender);
    }
}
