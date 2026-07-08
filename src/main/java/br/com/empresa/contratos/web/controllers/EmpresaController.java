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

import br.com.empresa.contratos.models.Empresa;
import br.com.empresa.contratos.services.EmpresaService;

@RestController
@RequestMapping("/api/empresas")
public class EmpresaController {

	@Autowired
	private EmpresaService empresaService;

	@GetMapping
	public List<Empresa> listar() {
		return empresaService.buscarTodos();
	}

	@GetMapping("/{id}")
	public Empresa buscar(@PathVariable Long id) {
		return empresaService.buscarPorId(id);
	}

	@PostMapping
	public ResponseEntity<Empresa> salvar(@Valid @RequestBody Empresa empresa) {
		empresaService.salvar(empresa);
		return ResponseEntity.status(HttpStatus.CREATED).body(empresa);
	}

	@PutMapping("/{id}")
	public Empresa editar(@PathVariable Long id, @Valid @RequestBody Empresa empresa) {
		empresa.setId(id);
		empresaService.editar(empresa);
		return empresa;
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> excluir(@PathVariable Long id) {
		empresaService.excluir(id);
		return ResponseEntity.noContent().build();
	}
}
