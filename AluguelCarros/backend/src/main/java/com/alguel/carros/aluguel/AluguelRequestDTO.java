package com.alguel.carros.aluguel;

public record AluguelRequestDTO(String dataInicio, String dataFim, String localRetirada, String localDevolucao, String empregador1, Double rendimentoEmpregador1, String empregador2, Double rendimentoEmpregador2, String empregador3, Double rendimentoEmpregador3, Long carroId) {

}
