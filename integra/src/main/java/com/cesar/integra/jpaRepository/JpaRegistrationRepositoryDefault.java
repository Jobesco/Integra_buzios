package com.cesar.integra.jpaRepository;

import com.cesar.integra.jpaModel.JpaActivity;
import com.cesar.integra.jpaModel.JpaRegistration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JpaRegistrationRepositoryDefault extends JpaRepository<JpaRegistration, Integer> {
//    @Query("SELECT DISTINCT a FROM JpaActivity a JOIN JpaGroup g ON a.title = g.activity.title WHERE g.event.name = :eventName")
//    List<JpaActivity> findActivitiesByEvent(@Param("eventName") String eventName);

    List<JpaRegistration> findRegistrationsByUser_EmailAndStatusEquals(String userEmail, String status);

    List<JpaRegistration> findJpaRegistrationByActivity_TitleAndAvailableDaysContains(String activityTitle, String availableDays);
}
