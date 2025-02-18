package com.cesar.integra.controller;

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
    public ResponseEntity<Group> createGroup(@RequestBody Group group) {

        Optional<Event> event = eventService.find(group.getEvent().getName());
        if (event.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Optional<Activity> activity = activityService.find(group.getActivity().getTitle());
        if (activity.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Group newGroup = new Group(event.get(), activity.get(), group.getRealizationDateTime(), group.getStatus());

        Group savedGroup = groupService.save(newGroup);
        return ResponseEntity.ok(savedGroup);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Group> getGroup(@PathVariable int id) {
        Optional<Group> group = groupService.findById(id);
        return group.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Group>> getAllGroups() {
        List<Group> groups = groupService.findAll();
        return ResponseEntity.ok(groups);
    }

    @PutMapping("/{id}/edit")
    public ResponseEntity<Group> updateGroup(@PathVariable int id, @RequestBody Group group) {
        Optional.ofNullable(group)
                .filter(g -> g.getId() != 0)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Group ID"));

        return groupService.findById(id)
                .map(existingGroup -> {
                    groupService.save(group);
                    return ResponseEntity.ok(group);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Group> deleteGroup(@PathVariable int id) {
        Optional<Group> existingGroup = groupService.findById(id);

        if (existingGroup.isPresent()) {
            groupService.delete(id);
            return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.notFound().build();
        }
    }
}
