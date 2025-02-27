package com.cesar.integra.repository;

import com.cesar.integra.model.Group;

import java.util.List;
import java.util.Optional;

public interface GroupRepository {
    public Group save(Group group);
    public Optional<Group> findById(int id);
    public List<Group> findAll();
    public List<Group> findByActivity_Title(String activity_Title);
    public void endGroupsInEvent();
    public List<Group> findByEvent_Name(String eventName);
    public void delete(int id);
}
