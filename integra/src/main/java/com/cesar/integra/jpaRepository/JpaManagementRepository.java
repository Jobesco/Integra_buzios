package com.cesar.integra.jpaRepository;

import com.cesar.integra.jpaModel.JpaManagement;
import com.cesar.integra.mapper.ManagementMapper;
import com.cesar.integra.model.Management;
import com.cesar.integra.repository.ManagementRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import static org.springframework.util.Assert.isTrue;
import static org.springframework.util.Assert.notNull;

@Repository
public class JpaManagementRepository implements ManagementRepository {
    private final JpaManagementRepositoryDefault jpaManagementRepositoryDefault;

    public JpaManagementRepository(JpaManagementRepositoryDefault jpaManagementRepositoryDefault) {
        this.jpaManagementRepositoryDefault = jpaManagementRepositoryDefault;
    }

    @Override
    public Management save(Management management) {
        notNull(management, "Management must not be null");

        JpaManagement jpaManagement = ManagementMapper.toJpaManagement(management);
        JpaManagement savedManagement = jpaManagementRepositoryDefault.save(jpaManagement);

        return ManagementMapper.toManagement(savedManagement);
    }

    @Override
    public Optional<Management> findById(int id) {
        isTrue(id > 0, "Id must be greater than 0");

        return jpaManagementRepositoryDefault.findById(id)
                .map(ManagementMapper::toManagement);
    }

    @Override
    public List<Management> findAll() {
        return jpaManagementRepositoryDefault.findAll().stream()
                .map(ManagementMapper::toManagement)
                .toList();
    }

    @Override
    public void delete(int id) {
        isTrue(id > 0, "Id must be greater than 0");

        jpaManagementRepositoryDefault.deleteById(id);
    }
}
