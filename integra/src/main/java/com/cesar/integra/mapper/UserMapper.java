package com.cesar.integra.mapper;

import com.cesar.integra.jpaModel.JpaManagement;
import com.cesar.integra.jpaModel.JpaUser;
import com.cesar.integra.model.User;

import java.sql.Array;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.springframework.util.Assert.notNull;

public class UserMapper {

    public static JpaUser toJpaUser(User user) {
        notNull(user, "User must not be null");
        JpaUser jpaUser = new JpaUser();

        jpaUser.setEmail(user.getEmail());
        jpaUser.setPassword(user.getPassword());
        jpaUser.setName(user.getName());
        jpaUser.setRoles(user.getRoles() != null ? String.join("/", user.getRoles()) : "");

        if (user.getLastManagementId() != null) {
            JpaManagement jpaManagement = new JpaManagement();
            jpaManagement.setId(user.getLastManagementId());
            jpaUser.setManagement(jpaManagement);
        }else{
            jpaUser.setManagement(null);
        }

        jpaUser.setManagementString(user.getManagement() != null ? String.join("/", user.getManagement()) : "");

        jpaUser.setPhone(user.getPhone());
        jpaUser.setPwd(user.isPwd());
        jpaUser.setGender(user.getGender());
        jpaUser.setActive(user.getActive());

        return jpaUser;
    }

    public static User toUser(JpaUser jpaUser) {
        notNull(jpaUser, "JpaUser must not be null");

        List<String> roles = jpaUser.getRoles() != null && !jpaUser.getRoles().isEmpty()
                ? Arrays.asList(jpaUser.getRoles().split("/")) : Collections.emptyList();

        List<String> management = jpaUser.getManagementString() != null && !jpaUser.getManagementString().isEmpty()
                ? Arrays.asList(jpaUser.getManagementString().split("/")) : Collections.emptyList();

        Integer lastManagementId = jpaUser.getManagement() != null ? jpaUser.getManagement().getId() : null;

        return new User(
                jpaUser.getEmail(),
                jpaUser.getPassword(),
                jpaUser.getName(),
                roles,
                lastManagementId,
                management,
                jpaUser.getPhone(),
                jpaUser.isPwd(),
                jpaUser.getGender(),
                jpaUser.isActive()
        );
    }
}
