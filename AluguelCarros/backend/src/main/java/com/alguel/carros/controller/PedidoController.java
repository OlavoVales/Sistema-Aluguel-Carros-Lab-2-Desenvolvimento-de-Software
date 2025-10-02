package com.alguel.carros.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alguel.carros.pedido.Pedido;
import com.alguel.carros.pedido.PedidoRepository;
import com.alguel.carros.pedido.PedidoRequestDTO;
import com.alguel.carros.pedido.PedidoResponseDTO;

@RestController
@RequestMapping("pedidos")
public class PedidoController {

    @Autowired
    private PedidoRepository repository;

    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    @PostMapping
    public PedidoResponseDTO savePedido(@RequestBody PedidoRequestDTO data) {
        Pedido pedidoData = new Pedido(data);
        Pedido savedPedido = repository.save(pedidoData);
        return new PedidoResponseDTO(savedPedido);
    }

    
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    @GetMapping
    public List<PedidoResponseDTO> getAll(){

        List<PedidoResponseDTO> pedidos = repository.findAll().stream().map(PedidoResponseDTO::new).toList();

        return pedidos;
    }
}
