package com.cesar.integra.mapper;

import com.cesar.integra.jpaModel.JpaManagement;
import com.cesar.integra.model.Management;


public class ManagementMapper {

    public static JpaManagement toJpaManagement(Management management) {
        if (management == null) return null;
        JpaManagement jpaManagement = new JpaManagement();

        jpaManagement.setId(management.getId());
        jpaManagement.setParticle(management.getParticle());
        jpaManagement.setHierarchy(management.getHierarchy());
        jpaManagement.setParentId(toJpaManagement(management.getParent()));

        return jpaManagement;
    }

    public static Management toManagement(JpaManagement jpaManagement) {
        if (jpaManagement == null) return null;

        Management management = new Management();
        management.setId(jpaManagement.getId());
        management.setParticle(jpaManagement.getParticle());
        management.setHierarchy(jpaManagement.getHierarchy());

        management.setParent(toManagement(jpaManagement.getParentId()));

        return management;
    }
}
