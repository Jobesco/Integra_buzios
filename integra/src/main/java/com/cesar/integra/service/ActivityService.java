package com.cesar.integra.service;

import com.cesar.integra.model.Activity;
import com.cesar.integra.repository.ActivityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivityService {
    private final ActivityRepository activityRepository;

    public ActivityService(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    public Activity save(Activity activity) {
        return activityRepository.save(activity);
    }

    public Activity find(String title) {
        return activityRepository.findByTitle(title);
    }

    public List<Activity> findAll() {
        return activityRepository.findAll();
    }

    public Activity delete(String title) {
        return activityRepository.delete(title);
    }
}
