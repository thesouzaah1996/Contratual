package br.com.empresa.contratos.web.controllers;

import java.time.LocalDate;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.empresa.contratos.models.CentroDeCusto;
import br.com.empresa.contratos.models.Contraparte;
import br.com.empresa.contratos.models.Contrato;
import br.com.empresa.contratos.models.Departamento;
import br.com.empresa.contratos.models.Emissor;
import br.com.empresa.contratos.models.TipoContrato;
import br.com.empresa.contratos.models.TipoResgistro;
import br.com.empresa.contratos.models.Unidade;
import br.com.empresa.contratos.services.CentroDeCustoService;
import br.com.empresa.contratos.services.ContraparteService;
import br.com.empresa.contratos.services.ContratoService;
import br.com.empresa.contratos.services.DepartamentoService;
import br.com.empresa.contratos.services.TipoContratoService;
import br.com.empresa.contratos.services.UnidadeService;
import br.com.empresa.contratos.web.dto.AditivoRequest;
import br.com.empresa.contratos.web.dto.ContratoRequest;
import br.com.empresa.contratos.web.dto.DistratoRequest;

@RestController
@RequestMapping("/api/contratos")
public class ContratoController {

	@Autowired
	private ContratoService contratoService;

	@Autowired
	private CentroDeCustoService centroCustoService;

	@Autowired
	private ContraparteService contraparteService;

	@Autowired
	private DepartamentoService deptoService;

	@Autowired
	private TipoContratoService tipoContratoService;

	@Autowired
	private UnidadeService unidadeService;

	@GetMapping
	public List<Contrato> pesquisar(
			@RequestParam(required = false, defaultValue = "") String codigoProcesso,
			@RequestParam(required = false, defaultValue = "") String codigoContrato,
			@RequestParam(required = false) Emissor emissor,
			@RequestParam(required = false) Long tipoContratoId,
			@RequestParam(required = false) Long centroDeCustoId,
			@RequestParam(required = false) Long departamentoId,
			@RequestParam(required = false) Long unidadeId,
			@RequestParam(required = false) LocalDate dataInicio,
			@RequestParam(required = false) LocalDate dataFim) {

		Contrato filtro = new Contrato();
		filtro.setCodigoProcesso(codigoProcesso);
		filtro.setCodigoContrato(codigoContrato);
		filtro.setEmissor(emissor);
		filtro.setTipoContrato(tipoContratoId != null ? tipoContratoService.buscarPorId(tipoContratoId) : null);
		filtro.setCentroDeCusto(centroDeCustoId != null ? centroCustoService.buscarPorId(centroDeCustoId) : null);
		filtro.setDepartamento(departamentoId != null ? deptoService.buscarPorId(departamentoId) : null);
		filtro.setUnidade(unidadeId != null ? unidadeService.buscarPorId(unidadeId) : null);
		filtro.setDataInicio(dataInicio);
		filtro.setDataFim(dataFim);

		return contratoService.pesquisar(filtro);
	}

	@GetMapping("/{id}")
	public Contrato buscar(@PathVariable Long id) {
		return contratoService.buscarPorId(id);
	}

	@PostMapping
	public ResponseEntity<Contrato> salvar(@Valid @RequestBody ContratoRequest request) {
		Contrato contrato = popularContrato(new Contrato(), request);
		contrato.setTipoRegistro(TipoResgistro.C);
		contratoService.salvar(contrato);
		return ResponseEntity.status(HttpStatus.CREATED).body(contrato);
	}

	@PutMapping("/{id}")
	public Contrato editar(@PathVariable Long id, @Valid @RequestBody ContratoRequest request) {
		Contrato contrato = popularContrato(contratoService.buscarPorId(id), request);
		contrato.setId(id);
		contratoService.editar(contrato);
		return contrato;
	}

	@PostMapping("/{id}/aditivos")
	public Contrato lancarAditivo(@PathVariable Long id, @Valid @RequestBody AditivoRequest request) {
		Contrato contrato = contratoService.buscarPorId(id);
		contrato.setTipoRegistro(TipoResgistro.A);
		contrato.setCodigoAditivo(request.codigoAditivo());
		contrato.setDataInicioAditivo(request.dataInicioAditivo());
		contrato.setDataFimAditivo(request.dataFimAditivo());
		contrato.setFidelidade(request.fidelidade());
		contrato.setRenovacaoAutomatica(request.renovacaoAutomatica());
		contrato.setValor(request.valor());
		contrato.setResponsavel(request.responsavel());
		contrato.setObservacoes(request.observacoes());
		contratoService.editar(contrato);
		return contrato;
	}

	@PostMapping("/{id}/distratos")
	public Contrato lancarDistrato(@PathVariable Long id, @Valid @RequestBody DistratoRequest request) {
		Contrato contrato = contratoService.buscarPorId(id);
		contrato.setTipoRegistro(TipoResgistro.D);
		contrato.setCodigoDistrato(request.codigoDistrato());
		contrato.setDataDistrato(request.dataDistrato());
		contrato.setResponsavel(request.responsavel());
		contrato.setObservacoes(request.observacoes());
		contratoService.editar(contrato);
		return contrato;
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> excluir(@PathVariable Long id) {
		contratoService.excluir(id);
		return ResponseEntity.noContent().build();
	}

	private Contrato popularContrato(Contrato contrato, ContratoRequest request) {
		TipoContrato tipoContrato = tipoContratoService.buscarPorId(request.tipoContratoId());
		Contraparte contraparte = contraparteService.buscarPorId(request.contraparteId());
		Departamento departamento = deptoService.buscarPorId(request.departamentoId());
		Unidade unidade = unidadeService.buscarPorId(request.unidadeId());
		CentroDeCusto centroDeCusto = centroCustoService.buscarPorId(request.centroDeCustoId());

		contrato.setTipoContrato(tipoContrato);
		contrato.setTipoEspecifico(request.tipoEspecifico());
		contrato.setContraparte(contraparte);
		contrato.setDepartamento(departamento);
		contrato.setUnidade(unidade);
		contrato.setCentroDeCusto(centroDeCusto);
		contrato.setEmissor(Emissor.valueOf(request.emissor()));
		contrato.setPossuiDocumento(request.possuiDocumento());
		contrato.setDataInicio(request.dataInicio());
		contrato.setDataFim(request.dataFim());
		contrato.setRenovacaoAutomatica(request.renovacaoAutomatica());
		contrato.setObservacoes(request.observacoes());
		contrato.setCodigoProcesso(request.codigoProcesso());
		contrato.setCodigoContrato(request.codigoContrato());
		contrato.setResponsavel(request.responsavel());
		contrato.setValor(request.valor());
		contrato.setFidelidade(request.fidelidade());
		return contrato;
	}
}
