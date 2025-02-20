package com.cesar.integra.repository;

import com.cesar.integra.model.Management;

import java.util.List;

public interface ManagementRepository {
    public Management save(Management management);
    public Management findById(int id);
    public List<Management> findAll(int id);
    public void delete(int id);
}
