package com.cesar.integra.repository;

import com.cesar.integra.model.Activity;
import java.util.List;
import java.util.Optional;

public interface ActivityRepository {
    public Activity save(Activity activity);
    public Optional<Activity> findByTitle(String title);
    public List<Activity> findAll();
    public List<Activity> findActivitiesByEvent(String eventName);
    public void delete(String title);
}
