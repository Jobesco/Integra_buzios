package com.cesar.integra.model;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.AccessLevel;
import lombok.Setter;
import lombok.Getter;

import static org.springframework.util.Assert.notNull;

@Getter
@Setter
public class User implements Serializable{
    private String email;
    @Setter(AccessLevel.PRIVATE)
    private String password;
    private String name;
    private List<String> roles;
    private Integer lastManagementId;
    private List<String> management;
    private String phone;
    private boolean pwd;
    private String gender;
    private Boolean active;

    public User() {}

    public User(String email, String password, String name, List<String> roles, Integer lastManagementId, List<String> management,
                String phone, boolean pwd, String gender, boolean active) {
        notNull(email, "User email cannot be null");
        notNull(name, "User name cannot be null");
        notNull(password, "User password cannot be null");
        notNull(roles, "User management cannot be null");
        notNull(phone, "User phone cannot be null");
        notNull(gender, "User gender cannot be null");
        this.email = email;
        this.password = password;
        this.name = name;
        this.roles = roles;
        this.lastManagementId = lastManagementId;
        this.management = management;
        this.phone = phone;
        this.pwd = pwd;
        this.gender = gender;
        this.active = active;
    }

    public void setEncodedPassword(String encodedPassword) {
        notNull(encodedPassword, "Password cannot be null");
        this.password = encodedPassword;
    }

    @Override
    public String toString() {
        return String.format("Name: %s, Email: %s, PwD: %s, Gender: %s", name, email, isPwd(), gender);
    }

    public Map<String, Object> toJson() {
        Map<String, Object> userJson = new HashMap<>();
        userJson.put("email", this.email);
        userJson.put("name", this.name);
        userJson.put("roles", this.roles);
        userJson.put("lastManagementId", this.lastManagementId);
        userJson.put("management", this.management);
        userJson.put("phone", this.phone);
        userJson.put("pwd", this.pwd);
        userJson.put("gender", this.gender);
        userJson.put("active", this.active);
        return userJson;
    }
}
