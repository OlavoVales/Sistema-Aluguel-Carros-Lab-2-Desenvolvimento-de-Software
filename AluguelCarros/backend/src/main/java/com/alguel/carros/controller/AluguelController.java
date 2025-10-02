package com.alguel.carros.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alguel.carros.aluguel.Aluguel;
import com.alguel.carros.aluguel.AluguelRepository;
import com.alguel.carros.aluguel.AluguelRequestDTO;
import com.alguel.carros.aluguel.AluguelResponseDTO;
import com.alguel.carros.carro.CarRepository;
import com.alguel.carros.carro.Carro;

@RestController
@RequestMapping("aluguel")
public class AluguelController {

    @Autowired
    private AluguelRepository repository;

    @Autowired
    private CarRepository carRepository;

    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    @PostMapping
    @Transactional
    public AluguelResponseDTO saveAluguel(@RequestBody AluguelRequestDTO data) {
        Aluguel aluguelData = new Aluguel(data);
        Aluguel savedAluguel = repository.save(aluguelData);

        Carro carroAlugado = carRepository.findById(data.carroId())
                .orElseThrow(() -> new RuntimeException("Carro não encontrado!"));

        carroAlugado.setDisponivel(false);

        carRepository.save(carroAlugado);
        
        return new AluguelResponseDTO(savedAluguel);
    }

    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    @GetMapping
    public List<AluguelResponseDTO> getAll(){
        List<AluguelResponseDTO> alugueis = repository.findAll().stream().map(AluguelResponseDTO::new).toList();
        return alugueis;
    }
}