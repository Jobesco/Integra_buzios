package com.cesar.integra.controller;


import com.cesar.integra.model.GroupDTO;
import com.cesar.integra.model.Group;
import com.cesar.integra.model.Event;
import com.cesar.integra.model.Activity;
import com.cesar.integra.service.GroupService;
import com.cesar.integra.service.EventService;
import com.cesar.integra.service.ActivityService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/groups")
public class GroupController {
    private  GroupService groupService;
    private  ActivityService activityService;
    private  EventService eventService;

    @PostMapping("/newGroup")
    public ResponseEntity<Group> createGroup(@RequestBody GroupDTO groupDTO) {

        Optional<Event> event = eventService.find(groupDTO.getEventName());
        if (event.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Optional<Activity> activity = activityService.find(groupDTO.getActivityTitle());
        if (activity.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Group newGroup = new Group();
        newGroup.setEvent(event.get());
        newGroup.setActivity(activity.get());
        newGroup.setRealizationDateTime(groupDTO.getRealizationDateTime());
        newGroup.setStatus(groupDTO.getStatus());

        Group savedGroup = groupService.save(newGroup);
        return  ResponseEntity.ok(savedGroup);
    }
   
    @GetMapping("/{id}")
    public ResponseEntity<Group> getGroup(@PathVariable int id) {
        Optional<Group> group = groupService.findById(id);
        return group.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
