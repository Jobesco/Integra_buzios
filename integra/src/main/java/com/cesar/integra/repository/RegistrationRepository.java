package com.cesar.integra.repository;

import com.cesar.integra.model.Registration;

import java.util.List;

public interface RegistrationRepository {
    public Registration save(Registration registration);
    public Registration findById(int id);
    public List<Registration> findAll();
    public Registration delete(int id);
}
