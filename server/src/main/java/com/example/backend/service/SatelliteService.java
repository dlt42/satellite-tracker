package com.example.backend.service;

import com.example.backend.model.Satellite;

import java.util.List;

public interface SatelliteService {
    Satellite save(Satellite satellite);

    Satellite updateById(Long id, Satellite satellite);

    List<Satellite> findAll();

    Satellite findById(Long id);

    void deleteById(Long id);
}
