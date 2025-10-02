package com.alguel.carros.controller;

import com.alguel.carros.security.TokenService;
import com.alguel.carros.usuario.AuthLoginDTO;
import com.alguel.carros.usuario.TokenResponseDTO;
import com.alguel.carros.usuario.Usuario;
import com.alguel.carros.usuario.UsuarioRegisterDTO;
import com.alguel.carros.usuario.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private TokenService tokenService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    @PostMapping("/login")
    public ResponseEntity<TokenResponseDTO> login(@RequestBody AuthLoginDTO data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.senha());
        
        Authentication auth = this.authenticationManager.authenticate(usernamePassword);
        
        var token = tokenService.generateToken((Usuario) auth.getPrincipal());
        
        return ResponseEntity.ok(new TokenResponseDTO(token));
    }

    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody UsuarioRegisterDTO data) {
        if (this.usuarioRepository.findByEmail(data.email()).isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        String encryptedPassword = passwordEncoder.encode(data.senha());
        
        UsuarioRegisterDTO encryptedData = new UsuarioRegisterDTO(
            data.nome(), data.cpf(), data.rg(), data.email(),
            encryptedPassword, data.endereco(), data.profissao()
        );
        
        Usuario novoUsuario = new Usuario(encryptedData);
        this.usuarioRepository.save(novoUsuario);

        return ResponseEntity.ok().build();
    }
}