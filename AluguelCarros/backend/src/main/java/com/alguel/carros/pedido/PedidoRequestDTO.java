package com.alguel.carros.pedido;

public record PedidoRequestDTO(String dataInicio, String dataFim, String carroModelo, String carroMarca, String carroPlaca, Double valorTotal, Boolean aprovado, Boolean concluido, Long aluguelId) {

}
