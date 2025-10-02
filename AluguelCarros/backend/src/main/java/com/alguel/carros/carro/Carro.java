package com.alguel.carros.carro;

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

@Table(name = "carros")
@Entity(name = "carros")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Carro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String modelo;
    private String marca;
    private String placa;
    private Integer ano;
    private Double valorDiaria;
    private Boolean disponivel = true;
    private String imagem = null;

    public Carro(CarRequestDTO data) {
        this.modelo = data.modelo();
        this.marca = data.marca();
        this.placa = data.placa();
        this.ano = data.ano();
        this.valorDiaria = data.valorDiaria();
        this.disponivel = data.disponivel();
        this.imagem = data.imagem();
    }
}