package br.com.empresa.contratos.web.controllers;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.empresa.contratos.models.Contraparte;
import br.com.empresa.contratos.services.ContraparteService;

@RestController
@RequestMapping("/api/contrapartes")
public class ContraparteController {

	@Autowired
	private ContraparteService contraparteService;

	@GetMapping
	public List<Contraparte> listar() {
		return contraparteService.buscarTodos();
	}

	@GetMapping("/{id}")
	public Contraparte buscar(@PathVariable Long id) {
		return contraparteService.buscarPorId(id);
	}

	@PostMapping
	public ResponseEntity<Contraparte> salvar(@Valid @RequestBody Contraparte contraparte) {
		contraparteService.salvar(contraparte);
		return ResponseEntity.status(HttpStatus.CREATED).body(contraparte);
	}

	@PutMapping("/{id}")
	public Contraparte editar(@PathVariable Long id, @Valid @RequestBody Contraparte contraparte) {
		contraparte.setId(id);
		contraparteService.editar(contraparte);
		return contraparte;
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> excluir(@PathVariable Long id) {
		contraparteService.excluir(id);
		return ResponseEntity.noContent().build();
	}
}
