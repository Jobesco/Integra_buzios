package com.cesar.integra.controller;

import com.cesar.integra.service.AlgorithmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/algorithm")
public class AlgorithmController {
    @Autowired
    private AlgorithmService algorithmService;

    @PostMapping("/{eventTitle}")
    public ResponseEntity<Void> runAlgorithm(@PathVariable String eventTitle){
        algorithmService.runAllFromEvent(eventTitle);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/forActivity/{activityTitle}")
    public ResponseEntity<Void> runAlgorithmForActivity(@PathVariable String activityTitle) {
        algorithmService.runForActivity(activityTitle);
        return ResponseEntity.ok().build();
    }
}
