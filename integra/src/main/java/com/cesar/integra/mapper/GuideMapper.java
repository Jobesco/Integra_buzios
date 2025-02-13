package com.cesar.integra.mapper;

import com.cesar.integra.jpaModel.JpaGuide;
import com.cesar.integra.model.Guide;
import com.cesar.integra.util.SqlDateConverter;

import static org.springframework.util.Assert.notNull;

public class GuideMapper {

    public static JpaGuide toJpaGuide(Guide guide) {
        notNull(guide, "Guide must not be null");
        JpaGuide jpaGuide = new JpaGuide();

        jpaGuide.setId(guide.getId());
        jpaGuide.setUser(UserMapper.toJpaUser(guide.getUser()));
        jpaGuide.setGroup(GroupMapper.toJpaGroup(guide.getGroup()));
        jpaGuide.setAvailableDays(SqlDateConverter.toString(guide.getAvailableDays()));
        jpaGuide.setStatus(guide.getStatus());

        return jpaGuide;
    }

    public static Guide toGuide(JpaGuide jpaGuide) {
        notNull(jpaGuide, "JpaGuide must not be null");

        return new Guide(
                UserMapper.toUser(jpaGuide.getUser()),
                GroupMapper.toGroup(jpaGuide.getGroup()),
                jpaGuide.getStatus(),
                SqlDateConverter.toList(jpaGuide.getAvailableDays())
                );
    }
}
