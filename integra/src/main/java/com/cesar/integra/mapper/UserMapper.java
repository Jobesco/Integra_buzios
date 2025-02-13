package com.cesar.integra.mapper;

import com.cesar.integra.jpaModel.JpaUser;
import com.cesar.integra.model.User;

import java.sql.Array;
import java.util.Arrays;
import java.util.List;

import static org.springframework.util.Assert.notNull;

public class UserMapper {

    public static JpaUser toJpaUser(User user) {
        notNull(user, "User must not be null");
        JpaUser jpaUser = new JpaUser();

        jpaUser.setEmail(user.getEmail());
        jpaUser.setPassword(user.getPassword());
        jpaUser.setName(user.getName());
        jpaUser.setManagement(String.join("/", user.getManagement()));
        jpaUser.setPhone(user.getPhone());
        jpaUser.setPwd(user.isPwd());
        jpaUser.setGender(user.getGender());

        return jpaUser;
    }

    public static User toUser(JpaUser jpaUser) {
        notNull(jpaUser, "JpaUser must not be null");

        List<String> managements = Arrays.asList(jpaUser.getManagement().split("/"));

        return new User(
                jpaUser.getEmail(),
                jpaUser.getPassword(),
                jpaUser.getName(),
                managements,
                jpaUser.getPhone(),
                jpaUser.isPwd(),
                jpaUser.getGender()
        );
    }
}
