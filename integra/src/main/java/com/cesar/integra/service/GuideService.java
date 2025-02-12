package com.cesar.integra.service;

import com.cesar.integra.model.Group;
import com.cesar.integra.model.Guide;
import com.cesar.integra.model.User;
import com.cesar.integra.repository.GuideRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GuideService {
    private final GuideRepository guideRepository;

    public GuideService(GuideRepository guideRepository) {
        this.guideRepository = guideRepository;
    }

    public Guide save(Guide guide) {
        return guideRepository.save(guide);
    }

    public Guide find(User user, Group group){
        return guideRepository.findGuide(user, group);
    }

    public List<Guide> findAll(){
        return guideRepository.findAll();
    }

    public Guide delete(Guide guide) {
        return guideRepository.delete(guide);
    }
}
