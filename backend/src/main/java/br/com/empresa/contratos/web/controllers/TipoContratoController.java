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

import br.com.empresa.contratos.models.TipoContrato;
import br.com.empresa.contratos.services.TipoContratoService;

@RestController
@RequestMapping("/api/tipos-contrato")
public class TipoContratoController {

	@Autowired
	private TipoContratoService tipoContratoService;

	@GetMapping
	public List<TipoContrato> listar() {
		return tipoContratoService.buscarTodos();
	}

	@GetMapping("/{id}")
	public TipoContrato buscar(@PathVariable Long id) {
		return tipoContratoService.buscarPorId(id);
	}

	@PostMapping
	public ResponseEntity<TipoContrato> salvar(@Valid @RequestBody TipoContrato tipoContrato) {
		tipoContratoService.salvar(tipoContrato);
		return ResponseEntity.status(HttpStatus.CREATED).body(tipoContrato);
	}

	@PutMapping("/{id}")
	public TipoContrato editar(@PathVariable Long id, @Valid @RequestBody TipoContrato tipoContrato) {
		tipoContrato.setId(id);
		tipoContratoService.editar(tipoContrato);
		return tipoContrato;
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> excluir(@PathVariable Long id) {
		tipoContratoService.excluir(id);
		return ResponseEntity.noContent().build();
	}
}
