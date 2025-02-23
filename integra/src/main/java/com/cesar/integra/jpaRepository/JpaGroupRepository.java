package com.cesar.integra.jpaRepository;

import com.cesar.integra.jpaModel.JpaGroup;
import com.cesar.integra.mapper.GroupMapper;
import com.cesar.integra.model.Group;
import com.cesar.integra.repository.GroupRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

import static org.springframework.util.Assert.isTrue;
import static org.springframework.util.Assert.notNull;

@Repository
public class JpaGroupRepository implements GroupRepository {
    private final JpaGroupRepositoryDefault jpaGroupRepositoryDefault;

    public JpaGroupRepository(JpaGroupRepositoryDefault jpaGroupRepositoryDefault) {
        this.jpaGroupRepositoryDefault = jpaGroupRepositoryDefault;
    }

    @Override
    public Group save(Group group) {
        notNull(group, "Group must not be null");

        JpaGroup jpaGroup = GroupMapper.toJpaGroup(group);
        JpaGroup savedGroup = jpaGroupRepositoryDefault.save(jpaGroup);

        return GroupMapper.toGroup(savedGroup);
    }

    @Override
    public Optional<Group> findById(int id) {
        isTrue(id > 0, "Id must be greater than 0");

        return jpaGroupRepositoryDefault.findById(id)
                .map(GroupMapper::toGroup);
    }

    @Override
    public List<Group> findAll() {
        return jpaGroupRepositoryDefault.findAll().stream()
                .map(GroupMapper::toGroup)
                .toList();
    }

    public List<Group> findByActivity_Title(String activity_Title) {
        notNull(activity_Title, "Activity_Title must not be null");

        return jpaGroupRepositoryDefault.findByActivity_Title(activity_Title)
                .stream()
                .map(GroupMapper::toGroup)
                .toList();
    }

    @Override
    public void delete(int id) {
        isTrue(id > 0, "Id must be greater than 0");

        jpaGroupRepositoryDefault.deleteById(id);
    }
}
