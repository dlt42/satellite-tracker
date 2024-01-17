package com.example.backend;

import com.example.backend.model.Satellite;
import com.example.backend.service.SatelliteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class MyCommandLineRunner implements CommandLineRunner {

    @Autowired
    private SatelliteService satelliteService;

    @Override
    public void run(String... args) throws Exception {
        Satellite satellite = new Satellite();
        satellite.setName("S1");
        satellite.setLatitude(12D);
        satellite.setLongitude(99D);
        satellite.setOwner("ABC Ltd");
        satelliteService.save(satellite);

        Satellite satellite2 = new Satellite();
        satellite2.setName("S2");
        satellite2.setLatitude(11D);
        satellite2.setLongitude(55D);
        satellite2.setOwner("Acme Corp");
        satelliteService.save(satellite2);
    }
}
