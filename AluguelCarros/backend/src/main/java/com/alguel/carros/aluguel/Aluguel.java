package com.alguel.carros.aluguel;

import com.alguel.carros.carro.Carro;
import com.alguel.carros.usuario.Usuario;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "aluguel")
@Entity(name = "aluguel")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Aluguel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    private Usuario usuario;
    
    @ManyToOne
    @JoinColumn(name = "carro_id")
    private Carro carro; 
    
    private String dataInicio;
    private String dataFim;
    private String localRetirada;
    private String localDevolucao;
    private String empregador1;
    private Double rendimentoEmpregador1;
    private String empregador2;
    private Double rendimentoEmpregador2;
    private String empregador3;
    private Double rendimentoEmpregador3;

    public Aluguel(AluguelRequestDTO data) {
        this.dataInicio = data.dataInicio();
        this.dataFim = data.dataFim();
        this.localRetirada = data.localRetirada();
        this.localDevolucao = data.localDevolucao();
        this.empregador1 = data.empregador1();
        this.rendimentoEmpregador1 = data.rendimentoEmpregador1();
        this.empregador2 = data.empregador2();
        this.rendimentoEmpregador2 = data.rendimentoEmpregador2();
        this.empregador3 = data.empregador3();
        this.rendimentoEmpregador3 = data.rendimentoEmpregador3();
    }
}