package com.cesar.integra.service;

import com.cesar.integra.model.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class AlgorithmService {
    private final ActivityService activityService;
    private final GroupService groupService;
    private final RegistrationService registrationService;
    private final UserService userService;
    private final ParticipantService participantService;
    private final GuideService guideService;

    private final double metaSimilarity = 50.0;

    public AlgorithmService(ActivityService activityService, GroupService groupService, RegistrationService registrationService, UserService userService, ParticipantService participantService, GuideService guideService) {
        this.activityService = activityService;
        this.groupService = groupService;
        this.registrationService = registrationService;
        this.userService = userService;
        this.participantService = participantService;
        this.guideService = guideService;
    }

    @Transactional
    public void runAllFromEvent(String eventTitle){
        List<Activity> activities = activityService.findActivitiesByEvent(eventTitle);

        for(Activity activity : activities){
            runForActivity(activity.getTitle());
        }
    }

    @Transactional
    public void runForActivity(String activityTitle) {
        List<Group> groups = groupService.findByActivity_Title(activityTitle);

        for (Group group : groups) {
            if(!group.getStatus().equals("FECHADO")){
                runGroup(group);
            }
        }
    }

    public void runGroup(Group group) {
        List<Registration> candidates = new ArrayList<>(registrationService.findRegistrationsByActivity_TitleAndAvailableDaysContains(
                group.getActivity().getTitle(), group.getRealizationDateTime().toLocalDate().toString()
        ));

        if(group.getActivity().isPwdPriority()){
            candidates.sort(Comparator.comparing((Registration c) -> c.getUser().isPwd()).reversed());
        }

        List<Registration> selectedCandidates = new ArrayList<>();
        int man = 0, woman = 0;

        while(selectedCandidates.size() < group.getActivity().getTickets() && !candidates.isEmpty()) {
            Registration bestCandidate = null;
            double biggestDifference = -1.0;

            for (Registration candidate : candidates) {
                if(!registrationService.findRegistrationsByUser_EmailAndStatusEquals(candidate.getUser().getEmail(), "ALOCADO").isEmpty()){
                    continue;
                }
                if(man > woman + 1 && candidate.getUser().getGender().equals("M")){
                    continue;
                }
                if(woman > man + 1 && candidate.getUser().getGender().equals("F")){
                    continue;
                }

                double managementDifference = calculateManagementDifference(selectedCandidates, candidate, metaSimilarity);

                if(managementDifference > biggestDifference || bestCandidate == null){
                    bestCandidate = candidate;
                }
            }

            selectedCandidates.add(bestCandidate);
            candidates.remove(bestCandidate);

            if(bestCandidate != null && bestCandidate.getUser().getGender().equals("M")){
                man++;
            } else if (bestCandidate != null && bestCandidate.getUser().getGender().equals("F")) {
                woman++;
            }
        }

        registerParticipantsInGroup(group, selectedCandidates);
    }

    private static double calculateManagementDifference(List<Registration> selectedCandidates, Registration candidate, double metaSimilarity) {
        if(selectedCandidates.isEmpty()) {
            return 0;
        }

        double mediaError = 0.0;
        int totalComparations = 0;

        for(Registration selectedCandidate : selectedCandidates ) {
            List<String> selectedManagements = selectedCandidate.getUser().getManagement();
            List<String> newManagements = candidate.getUser().getManagement();

            int total = Math.min(selectedManagements.size(), newManagements.size());
            int similar = 0, different = 0;

            int equalLimit = (int) Math.ceil(total * (metaSimilarity / 100.0));
            int differentLimit = total - equalLimit;

            boolean validEquals = true;
            for(int i = 0; i < total; i++) {
                if(i < equalLimit){
                    if(!selectedManagements.get(i).equals(newManagements.get(i))){
                        validEquals = false;
                        break;
                    }
                    similar++;

                }else{
                    if(!selectedManagements.get(i).equals(newManagements.get(i))){
                        different++;
                    }
                }
            }

            double equalityError = validEquals ? 0 : Math.abs((similar / (double) equalLimit) -1);
            double differenceError = Math.abs((different / (double) differentLimit) -1);
            double totalError = equalityError + differenceError;

            mediaError += totalError;
            totalComparations++;
        }

        return totalComparations > 0 ? mediaError / totalComparations : Double.MAX_VALUE;
    }

     public void registerParticipantsInGroup(Group group, List<Registration> registrations) {

         if(registrations.size() == group.getActivity().getTickets()) {
             group.setStatus("FECHADO");
             group = groupService.save(group);
         }

        for(Registration registration : registrations) {
            if(registration != null) {
                Participant participant = new Participant(group, registration);
                registration.setStatus("ALOCADO");

                registrationService.save(registration);
                participantService.save(participant);
            }
        }
    }

}
