package com.cesar.integra.jpaRepository;

import com.cesar.integra.jpaModel.JpaGuide;
import com.cesar.integra.mapper.GuideMapper;
import com.cesar.integra.model.Guide;
import com.cesar.integra.repository.GuideRepository;

import java.util.List;
import java.util.Optional;

import static org.springframework.util.Assert.notNull;

public class JpaGuideRepository implements GuideRepository {
    private final JpaGuideRepositoryDefault jpaGuideRepositoryDefault;

    public JpaGuideRepository(JpaGuideRepositoryDefault jpaGuideRepositoryDefault) {
        this.jpaGuideRepositoryDefault = jpaGuideRepositoryDefault;
    }

    @Override
    public Guide save(Guide guide) {
        notNull(guide, "Guide must not be null");

        JpaGuide jpaGuide = GuideMapper.toJpaGuide(guide);
        JpaGuide savedGuide = jpaGuideRepositoryDefault.save(jpaGuide);

        return GuideMapper.toGuide(savedGuide);
    }

    @Override
    public Optional<Guide> findById(int id) {
        return Optional.empty();
    }

    @Override
    public List<Guide> findAll() {
        return List.of();
    }

    @Override
    public void delete(int id) {

    }
}
