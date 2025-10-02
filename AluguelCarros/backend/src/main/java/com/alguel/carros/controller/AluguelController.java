package com.alguel.carros.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
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
import com.alguel.carros.usuario.Usuario;

@RestController
@RequestMapping("aluguel")
public class AluguelController {

    @Autowired
    private AluguelRepository repository;

    @Autowired
    private CarRepository carRepository;

    @PostMapping
    @Transactional
    public AluguelResponseDTO saveAluguel(@RequestBody AluguelRequestDTO data) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Usuario usuarioLogado = (Usuario) authentication.getPrincipal();

        Carro carroAlugado = carRepository.findById(data.carroId())
                .orElseThrow(() -> new RuntimeException("Carro não encontrado!"));

        Aluguel aluguelData = new Aluguel(data);
        aluguelData.setUsuario(usuarioLogado);
        
        aluguelData.setCarro(carroAlugado); 
        
        Aluguel savedAluguel = repository.save(aluguelData);

        carroAlugado.setDisponivel(false);
        carRepository.save(carroAlugado);
        
        return new AluguelResponseDTO(savedAluguel);
    }

    @GetMapping
    public List<AluguelResponseDTO> getMeusAlugueis(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Usuario usuarioLogado = (Usuario) authentication.getPrincipal();
        
        List<AluguelResponseDTO> alugueis = repository.findByUsuario(usuarioLogado)
            .stream()
            .map(AluguelResponseDTO::new)
            .toList();
            
        return alugueis;
    }
}