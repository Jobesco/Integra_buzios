package com.cesar.integra.controller;

import com.cesar.integra.model.Guide;
import com.cesar.integra.model.User;
import com.cesar.integra.model.Group;
import com.cesar.integra.service.GuideService;
import com.cesar.integra.service.UserService;
import com.cesar.integra.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/guide")
public class GuideController {
    @Autowired
    private UserService userService;
    @Autowired
    private GuideService guideService;
    @Autowired
    private GroupService groupService;


    @PostMapping("/newGuide")
    public ResponseEntity<Guide> createGuide(@RequestBody Guide guide){
        Optional<User> user = userService.find(guide.getUser().getEmail());
        if(user.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        Optional<Group> group = groupService.findById(guide.getGroup().getId());
        if (group.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        Guide newGuide = new Guide(user.get(), group.get(),guide.getStatus(), guide.getAvailableDays());

        Guide savedGuide = guideService.save(newGuide);
        return ResponseEntity.ok(savedGuide);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Guide> getGuideById(@PathVariable int id) {
        Optional<Guide> guide = guideService.find(id);
        return guide.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Guide>> getAllGuides() {
        List<Guide> guides = guideService.findAll();
        return ResponseEntity.ok(guides);
    }

    @PutMapping("/{id}/edit")
    public ResponseEntity<Guide> updateGuide(@PathVariable int id, @RequestBody Guide guide){
        Optional.ofNullable(guide)
                .filter(g -> g.getId() != 0)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Guide ID"));

        return guideService.find(id)
                .map(existingGuide -> {
                    guideService.save(guide);
                    return ResponseEntity.ok(guide);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping
    public ResponseEntity<Guide> deleteGuideById(@RequestParam int id) {
        Optional<Guide> existingGuide = guideService.find(id);
        if (existingGuide.isPresent()) {
            guideService.delete(id);
            return ResponseEntity.noContent().build();
        }else{
            return  ResponseEntity.notFound().build();
        }
    }
}
