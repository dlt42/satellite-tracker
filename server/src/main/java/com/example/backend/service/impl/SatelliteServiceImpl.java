package com.example.backend.service.impl;

import com.example.backend.model.Satellite;
import com.example.backend.repository.SatelliteRepository;
import com.example.backend.service.SatelliteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SatelliteServiceImpl implements SatelliteService {

    @Autowired
    private SatelliteRepository satelliteRepository;

    @Override
    public Satellite save(Satellite satellite) {
        return satelliteRepository.save(satellite);
    }

    @Override
    public Satellite updateById(Long id, Satellite satellite) {

        Satellite managedSatellite = this.findById(id);
        managedSatellite.setName(satellite.getName());
        managedSatellite.setLatitude(satellite.getLatitude());
        managedSatellite.setLongitude(satellite.getLongitude());
        managedSatellite.setOwner(satellite.getOwner());

        return this.save(managedSatellite);
    }

    @Override
    public List<Satellite> findAll() {
        return satelliteRepository.findAll();
    }

    @Override
    public Satellite findById(Long id) {
        return satelliteRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteById(Long id) {
        satelliteRepository.deleteById(id);
    }

}
