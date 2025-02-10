package repository;

import model.Activity;
import java.util.List;

public interface ActivityRepository {
    public Activity save(Activity activity);
    public Activity getActivity(int id);
    public List<Activity> getActivities();
    public Activity delete(int id);
}
