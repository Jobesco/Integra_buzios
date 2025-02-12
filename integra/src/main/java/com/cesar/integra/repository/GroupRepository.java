package com.cesar.integra.repository;

import com.cesar.integra.model.Group;

import java.util.List;

public interface GroupRepository {
    public Group save(Group group);
    public Group findById(int id);
    public List<Group> findAll();
    public Group delete(int id);
}
