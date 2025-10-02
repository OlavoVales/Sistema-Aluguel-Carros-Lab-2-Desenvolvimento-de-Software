package com.alguel.carros.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alguel.carros.carro.Carro;
import com.alguel.carros.carro.CarRepository;
import com.alguel.carros.carro.CarRequestDTO;
import com.alguel.carros.carro.CarResponseDTO;

@RestController
@RequestMapping("carros")
public class CarController {

    @Autowired
    private CarRepository repository;

    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    @PostMapping
    public CarResponseDTO saveCar(@RequestBody CarRequestDTO data) {
        Carro carData = new Carro(data);
        Carro savedCar = repository.save(carData);
        return new CarResponseDTO(savedCar);
    }

    
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    @GetMapping
    public List<CarResponseDTO> getAll(){

        List<CarResponseDTO> cars = repository.findAll().stream().map(CarResponseDTO::new).toList();

        return cars;
    }
}
