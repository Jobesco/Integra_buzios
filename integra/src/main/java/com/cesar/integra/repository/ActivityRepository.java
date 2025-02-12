package com.cesar.integra.repository;

import com.cesar.integra.model.Activity;
import java.util.List;

public interface ActivityRepository {
    public Activity save(Activity activity);
    public Activity findByTitle(String title);
    public List<Activity> findAll();
    public Activity delete(String title);
}
