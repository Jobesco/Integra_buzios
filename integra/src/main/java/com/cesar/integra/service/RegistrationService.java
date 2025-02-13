package com.cesar.integra.service;

import com.cesar.integra.model.Registration;
import com.cesar.integra.repository.RegistrationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RegistrationService {
    private final RegistrationRepository registrationRepository;


    public RegistrationService(RegistrationRepository registrationRepository) {
        this.registrationRepository = registrationRepository;
    }

    public Registration save(Registration registration) {
        return registrationRepository.save(registration);
    }

    public Optional<Registration> findById(int id) {
        return registrationRepository.findById(id);
    }

    public List<Registration> findAll() {
        return registrationRepository.findAll();
    }

    public void delete(int id) {
        registrationRepository.delete(id);
    }
}
