package com.cesar.integra.service;

import com.cesar.integra.model.Management;
import com.cesar.integra.repository.ManagementRepository;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ManagementService {
    private final ManagementRepository managementRepository;
    private final Map<Integer, Management> cache = new HashMap<>();

    public ManagementService(ManagementRepository managementRepository) {
        this.managementRepository = managementRepository;
    }
    
}
