package com.cesar.integra.repository;

import com.cesar.integra.model.Management;

import java.util.List;
import java.util.Optional;

public interface ManagementRepository {
    public Management save(Management management);
    public Optional<Management> findById(int id);
    public List<Management> findAll();
    public void delete(int id);
}
