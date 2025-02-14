package com.cesar.integra.serviceTests;

import com.cesar.integra.model.Activity;
import com.cesar.integra.repository.ActivityRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class ActivityTest {
    @Autowired
    private ActivityRepository activityRepository;

    @Test
    void testSaveAndFindActivity() {
        Activity activity = new Activity(
                "Workshop de Spring",
                "Aprenda o básico de Spring Boot",
                "Explicação detalhada para PwD",
                true,
                3,
                20,
                2,
                "Sala 3",
                50.0f
        );
        System.out.println(">>>>>>>>>" + activity.getPlace());
        activityRepository.save(activity);

        Optional<Activity> foundActivity = activityRepository.findByTitle(activity.getTitle());

        assertTrue(foundActivity.isPresent());
        assertEquals("Workshop de Spring", foundActivity.get().getTitle());
    }

    @Test
    void testUpdateActivity() {
        Activity activity = new Activity(
                "Workshop de Java", "Aprenda sobre Java moderno",
                "Acessibilidade garantida", true, 2, 15, 1,
                "Sala 1", 30.0f
        );
        activityRepository.save(activity);

        Optional<Activity> foundActivity = activityRepository.findByTitle("Workshop de Java");
        assertTrue(foundActivity.isPresent());

        Activity updatedActivity = foundActivity.get();
        updatedActivity = new Activity(
                updatedActivity.getTitle(), "Curso avançado de Java",
                updatedActivity.getPwdDescription(), updatedActivity.isPwdPriority(),
                updatedActivity.getEffortLevel(), updatedActivity.getTickets(),
                updatedActivity.getGuidesNumber(), "Sala 2", 35.0f
        );
        activityRepository.save(updatedActivity);

        Optional<Activity> modifiedActivity = activityRepository.findByTitle("Workshop de Java");
        assertTrue(modifiedActivity.isPresent());
        assertEquals("Sala 2", modifiedActivity.get().getPlace());
        assertEquals(35.0f, modifiedActivity.get().getCost());
    }

    @Test
    void testDeleteActivity() {
        Activity activity = new Activity(
                "Oficina de Banco de Dados", "Introdução a SQL",
                "Material adaptado para PwD", false, 1, 10, 1,
                "Sala 4", 20.0f
        );
        activityRepository.save(activity);

        Optional<Activity> foundActivity = activityRepository.findByTitle("Oficina de Banco de Dados");
        assertTrue(foundActivity.isPresent());

        activityRepository.delete(foundActivity.get().getTitle());

        Optional<Activity> deletedActivity = activityRepository.findByTitle("Oficina de Banco de Dados");
        assertFalse(deletedActivity.isPresent());
    }
}
