package com.alguel.carros.pedido;

public record PedidoResponseDTO(Long id, String dataInicio, String dataFim, String carroModelo, String carroMarca, String carroPlaca, Double valorTotal, Boolean aprovado, Boolean concluido, Long aluguelId) {

    public PedidoResponseDTO(Pedido pedido){
        this(pedido.getId(), pedido.getDataInicio(), pedido.getDataFim(), pedido.getCarroModelo(), pedido.getCarroMarca(), pedido.getCarroPlaca(), pedido.getValorTotal(), pedido.getAprovado(), pedido.getConcluido(), pedido.getAluguelId());
    }

}
