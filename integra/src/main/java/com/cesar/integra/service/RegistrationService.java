package com.cesar.integra.service;

import com.cesar.integra.model.Registration;
import com.cesar.integra.repository.RegistrationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegistrationService {
    private final RegistrationRepository registrationRepository;


    public RegistrationService(RegistrationRepository registrationRepository) {
        this.registrationRepository = registrationRepository;
    }

    public Registration save(Registration registration) {
        return registrationRepository.save(registration);
    }

    public Registration findById(int id) {
        return registrationRepository.findById(id);
    }

    public List<Registration> findAll() {
        return registrationRepository.findAll();
    }

    public Registration delete(int id) {
        return registrationRepository.delete(id);
    }
}
