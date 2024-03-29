package com.example.backend.repository;

import com.example.backend.model.Satellite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
 
@Repository
public interface SatelliteRepository extends JpaRepository<Satellite, Long> {

}
