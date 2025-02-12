package com.cesar.integra.service;

import com.cesar.integra.model.Group;
import com.cesar.integra.repository.GroupRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupService {
    private final GroupRepository groupRepository;

    public GroupService(GroupRepository groupRepository) {
        this.groupRepository = groupRepository;
    }

    public Group save(Group group) {
        return groupRepository.save(group);
    }

    public Group findById(int id) {
        return groupRepository.findById(id);
    }

    public List<Group> findAll() {
        return groupRepository.findAll();
    }

    public Group delete(int id) {
        return groupRepository.delete(id);
    }

    
}
