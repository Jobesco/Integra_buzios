package com.cesar.integra.controller;

import com.cesar.integra.model.Activity;
import com.cesar.integra.model.Registration;
import com.cesar.integra.service.ActivityService;
import com.cesar.integra.service.RegistrationService;
import com.cesar.integra.model.User;
import  com.cesar.integra.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/registration")
public class RegistrationController {
    @Autowired
    private RegistrationService registrationService;
    @Autowired
    private UserService userService;
    @Autowired
    private ActivityService activityService;

    @PostMapping("/newRegistration")
    public ResponseEntity<Registration> createRegistration(@RequestBody Registration registration) {
        Optional<User> user = userService.find(registration.getUser().getEmail());
        if(user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Optional<Activity> activity = activityService.find(registration.getActivity().getTitle());
        if(activity.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Registration newRegistration = new Registration(user.get(), activity.get(),
                registration.getRegistrationDateTime(), registration.getAvailableDays(),
                registration.getStatus(), registration.isOnVacation());

        Registration savedRegistration = registrationService.save(newRegistration);
        return ResponseEntity.ok(savedRegistration);
    }

    @GetMapping("{id}")
    public ResponseEntity<Registration> getRegistration(@PathVariable int id) {
        Optional<Registration> registration = registrationService.findById(id);
        return registration.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Registration>> getAllRegistration() {
        List<Registration> registrations = registrationService.findAll();
        return ResponseEntity.ok(registrations);
    }

    @PutMapping("{id}/edit")
    public ResponseEntity<Registration> updateRegistration(@PathVariable int id, @RequestBody Registration registration) {
        Optional.ofNullable(registration)
                .filter(r -> r.getId() != 0)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Registration ID"));

        return registrationService.findById(id)
                .map(existingRegistration -> {
                    registrationService.save(registration);
                    return ResponseEntity.ok(registration);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Registration> deleteRegistration(@PathVariable int id) {
        Optional<Registration> registration = registrationService.findById(id);

        if(registration.isPresent()) {
            registrationService.delete(id);
            return ResponseEntity.noContent().build();
        }else {
            return ResponseEntity.notFound().build();
        }
    }
}
