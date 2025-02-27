package com.cesar.integra.service;

import com.cesar.integra.model.Activity;
import com.cesar.integra.repository.ActivityRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ActivityService {
    private final ActivityRepository activityRepository;

    public ActivityService(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    public Activity save(Activity activity) {
        return activityRepository.save(activity);
    }

    public Optional<Activity> find(String title) {
        return activityRepository.findByTitle(title);
    }

    public List<Activity> findAll() {
        return activityRepository.findAll();
    }

    public List<Activity> findActivitiesByEvent(String eventName) {
        return activityRepository.findActivitiesByEvent(eventName);
    }

    public void reverseStatus(List<String> activityTitles) {
        activityRepository.reverseStatus(activityTitles);
    }

    public void delete(String title) {
        activityRepository.delete(title);
    }
}
