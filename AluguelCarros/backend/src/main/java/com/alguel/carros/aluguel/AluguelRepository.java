package com.alguel.carros.aluguel;

import com.alguel.carros.usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AluguelRepository extends JpaRepository<Aluguel, Long> {

    List<Aluguel> findByUsuario(Usuario usuario);
}