package com.alguel.carros.carro;

public record CarRequestDTO(String modelo, String marca, String placa, Integer ano, Double valorDiaria, Boolean disponivel, String imagem) {
    
}
