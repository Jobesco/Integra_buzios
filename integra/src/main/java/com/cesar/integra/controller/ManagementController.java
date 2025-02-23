package com.cesar.integra.controller;

import com.cesar.integra.model.Management;
import com.cesar.integra.service.ManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/management")
public class ManagementController {
    @Autowired
    private ManagementService managementService;

    @PostMapping("/newManagement")
    public ResponseEntity<Management> createManagement(@RequestBody Management management) {

        Management savedManagement = managementService.save(management);
        return ResponseEntity.ok(savedManagement);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Management> getManagement(@PathVariable Integer id) {
        Optional<Management> management = managementService.find(id);
        return management.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Management>> findAllManagement() {
        List<Management> managements = managementService.findAll();
        return ResponseEntity.ok(managements);
    }

    @PutMapping("/{id}/edit")
    public ResponseEntity<Management> updateManagement(@PathVariable Integer id, @RequestBody Management management) {
        Optional.ofNullable(management)
                .filter(m -> m.getId() > 0)
                .orElseThrow(() -> new IllegalArgumentException("Management id cannot be null"));

        return managementService.find(id)
                .map(existingManagement -> {
                    managementService.save(management);
                    return ResponseEntity.ok(management);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Management> deleteManagement(@PathVariable Integer id) {
        Optional<Management> management = managementService.find(id);

        if (management.isPresent()) {
            managementService.delete(id);
            return ResponseEntity.ok(management.get());
        }else{
            return ResponseEntity.notFound().build();
        }
    }
}
