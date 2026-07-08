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
import br.com.empresa.contratos.models.Unidade;
import br.com.empresa.contratos.services.EmpresaService;
import br.com.empresa.contratos.services.UnidadeService;
import br.com.empresa.contratos.web.dto.UnidadeRequest;

@RestController
@RequestMapping("/api/unidades")
public class UnidadeController {

	@Autowired
	private UnidadeService unidadeService;

	@Autowired
	private EmpresaService empresaService;

	@GetMapping
	public List<Unidade> listar() {
		return unidadeService.buscarTodos();
	}

	@GetMapping("/{id}")
	public Unidade buscar(@PathVariable Long id) {
		return unidadeService.buscarPorId(id);
	}

	@PostMapping
	public ResponseEntity<Unidade> salvar(@Valid @RequestBody UnidadeRequest request) {
		Unidade unidade = popularUnidade(new Unidade(), request);
		unidadeService.salvar(unidade);
		return ResponseEntity.status(HttpStatus.CREATED).body(unidade);
	}

	@PutMapping("/{id}")
	public Unidade editar(@PathVariable Long id, @Valid @RequestBody UnidadeRequest request) {
		Unidade unidade = popularUnidade(unidadeService.buscarPorId(id), request);
		unidade.setId(id);
		unidadeService.editar(unidade);
		return unidade;
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> excluir(@PathVariable Long id) {
		unidadeService.excluir(id);
		return ResponseEntity.noContent().build();
	}

	private Unidade popularUnidade(Unidade unidade, UnidadeRequest request) {
		Empresa empresa = empresaService.buscarPorId(request.empresaId());
		unidade.setNome(request.nome());
		unidade.setSite(request.site());
		unidade.setDimensaoAx(request.dimensaoAx());
		unidade.setCnpj(request.cnpj());
		unidade.setInativo(request.inativo());
		unidade.setMatriz(request.matriz());
		unidade.setEmpresa(empresa);
		return unidade;
	}
}
