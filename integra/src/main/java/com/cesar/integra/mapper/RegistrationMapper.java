package com.cesar.integra.mapper;

import com.cesar.integra.jpaModel.JpaRegistration;
import com.cesar.integra.model.Registration;
import com.cesar.integra.util.SqlDateConverter;

import static org.springframework.util.Assert.notNull;

public class RegistrationMapper {

    public static JpaRegistration toJpaRegistration(Registration registration){
        notNull(registration, "registration must not be null");
        JpaRegistration jpaRegistration = new JpaRegistration();

        jpaRegistration.setId(registration.getId());
        jpaRegistration.setUser(UserMapper.toJpaUser(registration.getUser()));
        jpaRegistration.setActivity(ActivityMapper.toJpaActivity(registration.getActivity()));
        jpaRegistration.setRegistrationDateTime(registration.getRegistrationDateTime());
        jpaRegistration.setAvailableDays(SqlDateConverter.toString(registration.getAvailableDays()));
        jpaRegistration.setStatus(registration.getStatus());

        return jpaRegistration;
    }

    public static Registration toRegistration(JpaRegistration jpaRegistration){
        notNull(jpaRegistration, "jpaRegistration must not be null");

        return new Registration(
                jpaRegistration.getId(),
                UserMapper.toUser(jpaRegistration.getUser()),
                ActivityMapper.toActivity(jpaRegistration.getActivity()),
                jpaRegistration.getRegistrationDateTime(),
                SqlDateConverter.toList(jpaRegistration.getAvailableDays()),
                jpaRegistration.getStatus()

        );
    }

}
