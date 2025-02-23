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

    @PostMapping
    public ResponseEntity<Void> runAlgorithm(){
        algorithmService.runAll();
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{activityTitle}")
    public ResponseEntity<Void> runAlgorithm(@PathVariable String activityTitle) {
        algorithmService.runForActivity(activityTitle);
        return ResponseEntity.ok().build();
    }
}
