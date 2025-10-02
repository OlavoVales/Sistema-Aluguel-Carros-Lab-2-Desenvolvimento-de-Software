package com.alguel.carros.carro;

public record CarResponseDTO(Long id, String modelo, String marca, String placa, Integer ano, Double valorDiaria, Boolean disponivel, String imagem) {

    public CarResponseDTO(Carro carro){
        this(carro.getId(), carro.getModelo(), carro.getMarca(), carro.getPlaca(), carro.getAno(), carro.getValorDiaria(), carro.getDisponivel(), carro.getImagem());
    }

}
