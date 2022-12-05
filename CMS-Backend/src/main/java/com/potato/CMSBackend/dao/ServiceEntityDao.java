package com.potato.CMSBackend.dao;

import com.potato.CMSBackend.model.ServiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceEntityDao extends JpaRepository<ServiceEntity, Long> {
}
