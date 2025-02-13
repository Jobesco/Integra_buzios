package com.cesar.integra.mapper;

import com.cesar.integra.jpaModel.JpaGroup;
import com.cesar.integra.model.Group;

import static org.springframework.util.Assert.notNull;

public class GroupMapper {

    public static JpaGroup toJpaGroup(Group group) {
        notNull(group, "group must not be null");
        JpaGroup jpaGroup = new JpaGroup();

        jpaGroup.setId(group.getId());
        jpaGroup.setEvent(EventMapper.toJpaEvent(group.getEvent()));
        jpaGroup.setActivity(ActivityMapper.toJpaActivity(group.getActivity()));
        jpaGroup.setRealizationDateTime(group.getRealizationDateTime());
        jpaGroup.setStatus(group.getStatus());

        return jpaGroup;
    }

    public static Group toGroup(JpaGroup jpaGroup) {
        notNull(jpaGroup, "jpaGroup must not be null");

        return new Group(
                jpaGroup.getId(),
                EventMapper.toEvent(jpaGroup.getEvent()),
                ActivityMapper.toActivity(jpaGroup.getActivity()),
                jpaGroup.getRealizationDateTime(),
                jpaGroup.getStatus()
        );
    }
}
