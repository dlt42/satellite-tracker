package com.example.backend.controller;

import com.example.backend.model.Satellite;
import com.example.backend.service.SatelliteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/satellites")
public class SatelliteController {

    @Autowired
    private SatelliteService satelliteService;

    @PostMapping
    public Satellite save(@RequestBody Satellite satellite) {
        return satelliteService.save(satellite);
    }

    @PutMapping("/{id}")
    public Satellite update(@PathVariable Long id, @RequestBody Satellite satellite) {
        return satelliteService.updateById(id, satellite);
    }

    @GetMapping
    public List<Satellite> findAll() {
        return satelliteService.findAll();
    }

    @GetMapping("/{id}")
    public Satellite findById(@PathVariable Long id) {
        return satelliteService.findById(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable Long id) {
        satelliteService.deleteById(id);
    }

}
