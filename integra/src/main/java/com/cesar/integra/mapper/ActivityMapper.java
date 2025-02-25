package com.cesar.integra.mapper;

import com.cesar.integra.jpaModel.JpaActivity;
import com.cesar.integra.model.Activity;

import static org.springframework.util.Assert.notNull;

public class ActivityMapper {

    public static JpaActivity toJpaActivity(Activity activity) {
        notNull(activity, "Activity must not be null");
        JpaActivity jpaActivity = new JpaActivity();

        jpaActivity.setTitle(activity.getTitle());
        jpaActivity.setDescription(activity.getDescription());
        jpaActivity.setPwdDescription(activity.getPwdDescription());
        jpaActivity.setPwdPriority(activity.isPwdPriority());
        jpaActivity.setEffortLevel(activity.getEffortLevel());
        jpaActivity.setTickets(activity.getTickets());
        jpaActivity.setGuidesNumber(activity.getGuidesNumber());
        jpaActivity.setPlace(activity.getPlace());
        jpaActivity.setActive(activity.isActive());
        jpaActivity.setVerifyGuide(activity.isVerifyGuide());
        jpaActivity.setCost(activity.getCost());

        return jpaActivity;
    }

    public static Activity toActivity(JpaActivity jpaActivity) {
        notNull(jpaActivity, "JpaActivity must not be null");

        return new Activity(
                jpaActivity.getTitle(),
                jpaActivity.getDescription(),
                jpaActivity.getPwdDescription(),
                jpaActivity.isPwdPriority(),
                jpaActivity.getEffortLevel(),
                jpaActivity.getTickets(),
                jpaActivity.getGuidesNumber(),
                jpaActivity.getPlace(),
                jpaActivity.isActive(),
                jpaActivity.isVerifyGuide(),
                jpaActivity.getCost()
                );
    }
}
