package com.cesar.integra.service;

import com.cesar.integra.model.Group;
import com.cesar.integra.model.Guide;
import com.cesar.integra.model.User;
import com.cesar.integra.repository.GuideRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GuideService {
    private final GuideRepository guideRepository;

    public GuideService(GuideRepository guideRepository) {
        this.guideRepository = guideRepository;
    }

    public Guide save(Guide guide) {
        return guideRepository.save(guide);
    }

    public Optional<Guide> find(int id){
        return guideRepository.findById(id);
    }

    public List<Guide> findAll(){
        return guideRepository.findAll();
    }

    public void delete(int id) {
        guideRepository.delete(id);
    }
}
