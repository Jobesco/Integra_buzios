package com.cesar.integra.jpaRepository;

import com.cesar.integra.jpaModel.JpaGroup;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JpaGroupRepositoryDefault extends JpaRepository<JpaGroup, Integer> {
    List<JpaGroup> findByActivity_Title(String activity_Title);

    List<JpaGroup> findByEvent_Name(String event_Name);

    @Modifying
    @Transactional
    @Query("UPDATE JpaGroup g SET g.status = 'FINALIZADO' WHERE g.status != 'FINALIZADO'")
    void endGroupsInEvent();
}
