package com.cesar.integra.jpaRepository;

import com.cesar.integra.jpaModel.JpaActivity;
import com.cesar.integra.jpaModel.JpaRegistration;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JpaRegistrationRepositoryDefault extends JpaRepository<JpaRegistration, Integer> {

    List<JpaRegistration> findRegistrationsByUser_EmailAndStatusEquals(String userEmail, String status);

    List<JpaRegistration> findJpaRegistrationByActivity_TitleAndAvailableDaysContains(String activityTitle, String availableDays);

    @Modifying
    @Transactional
    @Query("UPDATE JpaRegistration r SET r.status = 'FINALIZADO' WHERE r.status != 'FINALIZADO'")
    public void endRegistrations();
}
