package com.cesar.integra.repository;

import com.cesar.integra.model.Group;
import com.cesar.integra.model.Guide;
import com.cesar.integra.model.User;
import java.util.List;

public interface GuideRepository {
    public Guide save(Guide guide);
    public Guide findGuide(User user, Group group);
    public List<Guide> findAll();
    public Guide delete(Guide guide);
}
