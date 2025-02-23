package com.cesar.integra.service;

import com.cesar.integra.model.Management;
import com.cesar.integra.repository.ManagementRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ManagementService {
    private final ManagementRepository managementRepository;
    private final Map<Integer, Management> cache = new HashMap<>();

    public ManagementService(ManagementRepository managementRepository) {
        this.managementRepository = managementRepository;
    }

    public Management save(Management management) {
        Management saved = managementRepository.save(management);
        cache.put(saved.getId(), saved);
        return saved;
    }

    public List<Management> getHierarchyTree() {
        List<Management> allManagements = managementRepository.findAll();
        cache.clear();

        for (Management m : allManagements) {
            cache.put(m.getId(), new Management(m.getId(), m.getParticle(), null));
        }

        List<Management> rootNodes = new ArrayList<>();

        for (Management m : allManagements) {
            Management current = cache.get(m.getId());

            if (m.getParent() != null) {
                Management parent = cache.get(m.getParent().getId());
                current.setParent(parent);
            } else {
                rootNodes.add(current);
            }
        }

        return rootNodes;
    }

    public Optional<Management> find(int id) {
        if (cache.containsKey(id)) {
            return Optional.of(cache.get(id));
        }
        Optional<Management> management = managementRepository.findById(id);
        management.ifPresent(m -> cache.put(m.getId(), m));
        return management;
    }

    public List<Management> findAll(){
        return managementRepository.findAll();
    }

    public void delete(Integer id) {
        if (!cache.containsKey(id)) {
            managementRepository.delete(id);
            return;
        }

        List<Integer> childrenIds = new ArrayList<>();
        for (Management m : cache.values()) {
            if (m.getParent() != null && m.getParent().getId() == id) {
                childrenIds.add(m.getId());
            }
        }
        for (Integer childId : childrenIds) {
            delete(childId);
        }

        managementRepository.delete(id);
        cache.remove(id);

        getHierarchyTree();
    }
    
}
