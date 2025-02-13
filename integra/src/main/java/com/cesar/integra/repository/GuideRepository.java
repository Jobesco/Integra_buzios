package com.cesar.integra.repository;

import com.cesar.integra.model.Group;
import com.cesar.integra.model.Guide;
import com.cesar.integra.model.User;
import java.util.List;
import java.util.Optional;

public interface GuideRepository {
    public Guide save(Guide guide);
    public Optional<Guide> findById(int id);
    public List<Guide> findAll();
    public void delete(int id);
}
