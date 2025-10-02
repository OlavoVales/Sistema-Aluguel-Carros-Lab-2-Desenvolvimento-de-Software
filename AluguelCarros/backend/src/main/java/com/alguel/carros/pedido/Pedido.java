package com.alguel.carros.pedido;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "pedidos")
@Entity(name = "pedidos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String dataInicio;
    private String dataFim;
    private String carroModelo;
    private String carroMarca;
    private String carroPlaca;
    private Double valorTotal;
    private Boolean aprovado;
    private Boolean concluido;
    private Long aluguelId;

    public Pedido(PedidoRequestDTO data) {
        this.dataInicio = data.dataInicio();
        this.dataFim = data.dataFim();
        this.carroModelo = data.carroModelo();
        this.carroMarca = data.carroMarca();
        this.carroPlaca = data.carroPlaca();
        this.valorTotal = data.valorTotal();
        this.aprovado = false;
        this.concluido = false;
        this.aluguelId = data.aluguelId();
    }
}