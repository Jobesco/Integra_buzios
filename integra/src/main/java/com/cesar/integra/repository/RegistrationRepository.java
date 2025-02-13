package com.cesar.integra.repository;

import com.cesar.integra.model.Registration;

import java.util.List;
import java.util.Optional;

public interface RegistrationRepository {
    public Registration save(Registration registration);
    public Optional<Registration> findById(int id);
    public List<Registration> findAll();
    public void delete(int id);
}
