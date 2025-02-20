package com.cesar.integra.repository;

import com.cesar.integra.model.Topic;

import java.util.List;

public interface TopicRepository {
    public Topic save(Topic topic);
    public Topic findById(int id);
    public List<Topic> findAll();
    public void delete(int id);
}
