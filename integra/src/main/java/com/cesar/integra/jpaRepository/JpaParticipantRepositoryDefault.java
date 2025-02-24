package com.cesar.integra.jpaRepository;

import com.cesar.integra.jpaModel.JpaParticipant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JpaParticipantRepositoryDefault extends JpaRepository<JpaParticipant, Integer> {
    List<JpaParticipant> findByGroup_Id(Integer id);
}
