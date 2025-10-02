package com.alguel.carros.aluguel;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

public record AluguelResponseDTO(
    Long id, 
    String dataInicio, 
    String dataFim, 
    String localRetirada, 
    String localDevolucao,
    String empregador1, 
    Double rendimentoEmpregador1,
    String empregador2, 
    Double rendimentoEmpregador2,
    String empregador3, 
    Double rendimentoEmpregador3,
    String carroModelo,
    String carroMarca,
    String carroPlaca,
    Double valorTotal
) {

    public AluguelResponseDTO(Aluguel aluguel){
        this(
            aluguel.getId(), 
            aluguel.getDataInicio(), 
            aluguel.getDataFim(), 
            aluguel.getLocalRetirada(), 
            aluguel.getLocalDevolucao(),
            aluguel.getEmpregador1(),
            aluguel.getRendimentoEmpregador1(),
            aluguel.getEmpregador2(),
            aluguel.getRendimentoEmpregador2(),
            aluguel.getEmpregador3(),
            aluguel.getRendimentoEmpregador3(),
            aluguel.getCarro().getModelo(),
            aluguel.getCarro().getMarca(),
            aluguel.getCarro().getPlaca(),
            calculateValorTotal(aluguel)
        );
    }
    
    private static Double calculateValorTotal(Aluguel aluguel) {
        if (aluguel.getDataInicio() == null || aluguel.getDataFim() == null || aluguel.getCarro().getValorDiaria() == null) return 0.0;
        try {
            LocalDate inicio = LocalDate.parse(aluguel.getDataInicio());
            LocalDate fim = LocalDate.parse(aluguel.getDataFim());
            long numeroDeDias = ChronoUnit.DAYS.between(inicio, fim) + 1;
            if (numeroDeDias <= 0) return aluguel.getCarro().getValorDiaria();
            return numeroDeDias * aluguel.getCarro().getValorDiaria();
        } catch (Exception e) {
            return 0.0;
        }
    }
}