package com.cesar.integra.jpaRepository;

import com.cesar.integra.mapper.UserMapper;
import com.cesar.integra.model.Registration;
import com.cesar.integra.mapper.RegistrationMapper;
import com.cesar.integra.jpaModel.JpaRegistration;
import com.cesar.integra.repository.RegistrationRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

import static org.springframework.util.Assert.isTrue;
import static org.springframework.util.Assert.notNull;

@Repository
public class JpaRegistrationRepository implements RegistrationRepository {

    private final JpaRegistrationRepositoryDefault jpaRegistrationRepositoryDefault;

    public JpaRegistrationRepository(JpaRegistrationRepositoryDefault jpaRegistrationRepositoryDefault) {
        this.jpaRegistrationRepositoryDefault = jpaRegistrationRepositoryDefault;
    }

    @Override
    public Registration save(Registration registration) {
        notNull(registration, "registration must not be null");

        JpaRegistration jpaRegistration = RegistrationMapper.toJpaRegistration(registration);
        JpaRegistration savedJpaRegistration = jpaRegistrationRepositoryDefault.save(jpaRegistration);

        return RegistrationMapper.toRegistration(savedJpaRegistration);
    }

    @Override
    public Optional<Registration> findById(int id) {
        isTrue(id > 0, "id must be greater than 0");

        return jpaRegistrationRepositoryDefault.findById(id)
                .map(RegistrationMapper::toRegistration);
    }

    @Override
    public List<Registration> findAll() {
        return jpaRegistrationRepositoryDefault.findAll().stream()
                .map(RegistrationMapper::toRegistration)
                .toList();
    }

    @Override
    public List<Registration> findRegistrationsByUser_EmailAndStatusEquals(String userEmail, String status) {
        return jpaRegistrationRepositoryDefault.findRegistrationsByUser_EmailAndStatusEquals(userEmail, status)
                .stream()
                .map(RegistrationMapper::toRegistration)
                .toList();
    }

    @Override
    public List<Registration> findRegistrationByActivity_TitleAndAvailableDaysContains(String activityTitle, String day){
        return jpaRegistrationRepositoryDefault.findJpaRegistrationByActivity_TitleAndAvailableDaysContains(activityTitle, day)
                .stream()
                .map(RegistrationMapper::toRegistration)
                .toList();
    }

    @Override
    public void delete(int id) {
        isTrue(id > 0, "id must be greater than 0");

        jpaRegistrationRepositoryDefault.deleteById(id);
    }
}
