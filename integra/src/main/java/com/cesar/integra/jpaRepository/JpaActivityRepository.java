package com.cesar.integra.jpaRepository;

import com.cesar.integra.model.Activity;
import com.cesar.integra.jpaModel.JpaActivity;
import com.cesar.integra.mapper.ActivityMapper;
import com.cesar.integra.repository.ActivityRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.springframework.util.Assert.notNull;

@Repository
public class JpaActivityRepository implements ActivityRepository {

    private final JpaActivityRepositoryDefault jpaActivityRepositoryDefault;

    public JpaActivityRepository(JpaActivityRepositoryDefault jpaActivityRepositoryDefault) {
        this.jpaActivityRepositoryDefault = jpaActivityRepositoryDefault;
    }

    @Override
    public Activity save(Activity activity){
        notNull(activity, "Activity must not be null");

        JpaActivity jpaActivity = ActivityMapper.toJpaActivity(activity);
        JpaActivity savedActivity = jpaActivityRepositoryDefault.save(jpaActivity);

        return ActivityMapper.toActivity(savedActivity);
    }

    @Override
    public Optional<Activity> findByTitle(String title){
        notNull(title, "Title must not be null");

        return jpaActivityRepositoryDefault.findByTitle(title)
                .map(ActivityMapper::toActivity);
    }

    @Override
    public List<Activity> findAll(){
        return jpaActivityRepositoryDefault.findAll().stream()
                .map(ActivityMapper::toActivity)
                .toList();
    }

    @Override
    public List<Activity> findActivitiesByEvent(String eventName){
        notNull(eventName, "Event must not be null");

        return jpaActivityRepositoryDefault.findActivitiesByEvent(eventName)
                .stream()
                .map(ActivityMapper::toActivity)
                .toList();
    }

    @Override
    public void delete(String title){
        notNull(title, "Title must not be null");

        jpaActivityRepositoryDefault.deleteById(title);
    }

}
