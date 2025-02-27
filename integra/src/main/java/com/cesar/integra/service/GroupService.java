package com.cesar.integra.service;

import com.cesar.integra.model.Group;
import com.cesar.integra.repository.GroupRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GroupService {
    private final GroupRepository groupRepository;

    public GroupService(GroupRepository groupRepository) {
        this.groupRepository = groupRepository;
    }

    public Group save(Group group) {
        return groupRepository.save(group);
    }

    public Optional<Group> findById(int id) {
        return groupRepository.findById(id);
    }

    public List<Group> findAll() {
        return groupRepository.findAll();
    }

    public List<Group> findByActivity_Title(String activity_Title) {
        return groupRepository.findByActivity_Title(activity_Title);
    }

    public void endGroupsInEvent() {
        groupRepository.endGroupsInEvent();
    }

    public List<Group> findByEvent_Name(String event_Name) {
        return groupRepository.findByEvent_Name(event_Name);
    }

    public void delete(int id) {
        groupRepository.delete(id);
    }

    
}
