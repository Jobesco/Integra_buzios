package com.cesar.integra.controller;

import com.cesar.integra.model.Activity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class UserFunctionsController {

//    @PostMapping("/subscribe/{email}/{groupId}")
//    public ResponseEntity subscribe(@PathVariable String email, @PathVariable String groupId) {
//
//    }

//    @GetMapping("/{eventName}/availableActivities")
//    public ResponseEntity<List<Activity>> getAvailableActivities(@PathVariable String eventName) {
//        List<Activity> availableActivities = userFuncitonsService.findActivitiesInEvent(eventName);
//        return ResponseEntity.ok(availableActivities);
//    }

//    @PostMapping("/confirm/{email}/{groupId}")
//    public ResponseEntity confirmParticipation(){
//
//    }

}
