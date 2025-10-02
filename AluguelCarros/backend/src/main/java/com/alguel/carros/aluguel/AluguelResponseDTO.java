package com.alguel.carros.aluguel;

public record AluguelResponseDTO(Long id, String dataInicio, String dataFim, String localRetirada, String localDevolucao, String empregador1, Double rendimentoEmpregador1, String empregador2, Double rendimentoEmpregador2, String empregador3, Double rendimentoEmpregador3, Long carroId) {

    public AluguelResponseDTO(Aluguel aluguel){
        this(aluguel.getId(), aluguel.getDataInicio(), aluguel.getDataFim(), aluguel.getLocalRetirada(), aluguel.getLocalDevolucao(), aluguel.getEmpregador1(), aluguel.getRendimentoEmpregador1(), aluguel.getEmpregador2(), aluguel.getRendimentoEmpregador2(), aluguel.getEmpregador3(), aluguel.getRendimentoEmpregador3(), aluguel.getCarroId());
    }

}
