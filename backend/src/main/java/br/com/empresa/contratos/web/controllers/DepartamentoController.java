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

import br.com.empresa.contratos.models.Departamento;
import br.com.empresa.contratos.services.DepartamentoService;

@RestController
@RequestMapping("/api/departamentos")
public class DepartamentoController {

	@Autowired
	private DepartamentoService departamentoService;

	@GetMapping
	public List<Departamento> listar() {
		return departamentoService.buscarTodos();
	}

	@GetMapping("/{id}")
	public Departamento buscar(@PathVariable Long id) {
		return departamentoService.buscarPorId(id);
	}

	@PostMapping
	public ResponseEntity<Departamento> salvar(@Valid @RequestBody Departamento departamento) {
		departamentoService.salvar(departamento);
		return ResponseEntity.status(HttpStatus.CREATED).body(departamento);
	}

	@PutMapping("/{id}")
	public Departamento editar(@PathVariable Long id, @Valid @RequestBody Departamento departamento) {
		departamento.setId(id);
		departamentoService.editar(departamento);
		return departamento;
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> excluir(@PathVariable Long id) {
		departamentoService.excluir(id);
		return ResponseEntity.noContent().build();
	}
}
