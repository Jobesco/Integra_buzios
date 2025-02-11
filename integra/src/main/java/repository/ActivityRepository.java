package repository;

import model.Activity;
import java.util.List;

public interface ActivityRepository {
    public Activity save(Activity activity);
    public Activity getActivityByTitle(String title);
    public List<Activity> getActivities();
    public Activity delete(int id);
}
