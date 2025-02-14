package com.cesar.integra.jpaRepository;

import com.cesar.integra.jpaModel.JpaGuide;
import com.cesar.integra.mapper.GuideMapper;
import com.cesar.integra.model.Guide;
import com.cesar.integra.repository.GuideRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import static org.springframework.util.Assert.isTrue;
import static org.springframework.util.Assert.notNull;

@Repository
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
        isTrue(id > 0, "Id must be greater than 0");

        return jpaGuideRepositoryDefault.findById(id)
                .map(GuideMapper::toGuide);
    }

    @Override
    public List<Guide> findAll() {
        return jpaGuideRepositoryDefault.findAll().stream()
                .map(GuideMapper::toGuide)
                .toList();
    }

    @Override
    public void delete(int id) {
        isTrue(id > 0, "Id must be greater than 0");

        jpaGuideRepositoryDefault.deleteById(id);
    }
}
