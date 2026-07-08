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

import br.com.empresa.contratos.models.CentroDeCusto;
import br.com.empresa.contratos.services.CentroDeCustoService;

@RestController
@RequestMapping("/api/centros-de-custo")
public class CentroDeCustoController {

	@Autowired
	private CentroDeCustoService centroDeCustoService;

	@GetMapping
	public List<CentroDeCusto> listar() {
		return centroDeCustoService.buscarTodos();
	}

	@GetMapping("/{id}")
	public CentroDeCusto buscar(@PathVariable Long id) {
		return centroDeCustoService.buscarPorId(id);
	}

	@PostMapping
	public ResponseEntity<CentroDeCusto> salvar(@Valid @RequestBody CentroDeCusto centroDeCusto) {
		centroDeCustoService.salvar(centroDeCusto);
		return ResponseEntity.status(HttpStatus.CREATED).body(centroDeCusto);
	}

	@PutMapping("/{id}")
	public CentroDeCusto editar(@PathVariable Long id, @Valid @RequestBody CentroDeCusto centroDeCusto) {
		centroDeCusto.setId(id);
		centroDeCustoService.editar(centroDeCusto);
		return centroDeCusto;
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> excluir(@PathVariable Long id) {
		centroDeCustoService.excluir(id);
		return ResponseEntity.noContent().build();
	}
}
