package br.com.empresa.contratos.web.controllers;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import jakarta.persistence.Tuple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.empresa.contratos.models.CentroDeCusto;
import br.com.empresa.contratos.models.TipoContrato;
import br.com.empresa.contratos.models.TipoEntidade;
import br.com.empresa.contratos.models.Unidade;
import br.com.empresa.contratos.services.CentroDeCustoService;
import br.com.empresa.contratos.services.RelatorioService;
import br.com.empresa.contratos.services.TipoContratoService;
import br.com.empresa.contratos.services.UnidadeService;

@RestController
@RequestMapping("/api/relatorios")
public class RelatorioController {

	@Autowired
	private TipoContratoService tipoContratoService;

	@Autowired
	private CentroDeCustoService centroCustoService;

	@Autowired
	private RelatorioService relatorioService;

	@Autowired
	private UnidadeService unidadeService;

	@GetMapping("/dashboard")
	public Map<String, Object> dashboard() {
		return Map.of(
				"vencimento30x60x90", relatorioService.getVenciment90Dias(),
				"quantidadeDeRegistros", tuplas(relatorioService.getQuantidadeDeRegistros()),
				"quantidadePorCentroCusto", tuplas(relatorioService.getQuantidadePorCentroCusto()),
				"quantidadePorTipo", tuplas(relatorioService.getQuantidadePorTipo()),
				"quantidadePorUnidade", tuplas(relatorioService.getQuantidadePorUnidade()));
	}

	@GetMapping("/por-unidade")
	public List<Object[]> porUnidade(
			@RequestParam(required = false) Long tipoContratoId,
			@RequestParam(required = false) Long centroDeCustoId,
			@RequestParam(required = false) String cnpj,
			@RequestParam(required = false) LocalDate dataInicio,
			@RequestParam(required = false) LocalDate dataFim) {

		TipoContrato tipoContrato = buscarOuVazio(tipoContratoId, tipoContratoService::buscarPorId, TipoContrato::new);
		CentroDeCusto centroDeCusto = buscarOuVazio(centroDeCustoId, centroCustoService::buscarPorId, CentroDeCusto::new);

		return tuplas(relatorioService.porUnidade(tipoContrato, centroDeCusto, dataInicio, dataFim, cnpj));
	}

	@GetMapping("/por-entidade")
	public List<Object[]> porEntidade(
			@RequestParam(required = false) Long tipoContratoId,
			@RequestParam(required = false) Long centroDeCustoId,
			@RequestParam(required = false) String cnpj,
			@RequestParam(required = false) LocalDate dataInicio,
			@RequestParam(required = false) LocalDate dataFim,
			@RequestParam(required = false) Long unidadeId,
			@RequestParam(required = false) TipoEntidade tipoEntidade) {

		TipoContrato tipoContrato = buscarOuVazio(tipoContratoId, tipoContratoService::buscarPorId, TipoContrato::new);
		CentroDeCusto centroDeCusto = buscarOuVazio(centroDeCustoId, centroCustoService::buscarPorId, CentroDeCusto::new);
		Unidade unidade = buscarOuVazio(unidadeId, unidadeService::buscarPorId, Unidade::new);

		return tuplas(relatorioService.porEntidade(tipoContrato, centroDeCusto, cnpj, dataInicio, dataFim, unidade, tipoEntidade));
	}

	@GetMapping("/por-tipo-contrato")
	public List<Object[]> porTipoContrato(
			@RequestParam(required = false) Long centroDeCustoId,
			@RequestParam(required = false) LocalDate dataInicio,
			@RequestParam(required = false) LocalDate dataFim,
			@RequestParam(required = false) Long unidadeId) {

		CentroDeCusto centroDeCusto = buscarOuVazio(centroDeCustoId, centroCustoService::buscarPorId, CentroDeCusto::new);
		Unidade unidade = buscarOuVazio(unidadeId, unidadeService::buscarPorId, Unidade::new);

		return tuplas(relatorioService.porTipoContrato(centroDeCusto, dataInicio, dataFim, unidade));
	}

	@GetMapping("/por-centro-de-custo")
	public List<Object[]> porCentroDeCusto(
			@RequestParam(required = false) Long centroDeCustoId,
			@RequestParam(required = false) LocalDate dataInicio,
			@RequestParam(required = false) LocalDate dataFim,
			@RequestParam(required = false) Long unidadeId) {

		CentroDeCusto centroDeCusto = buscarOuVazio(centroDeCustoId, centroCustoService::buscarPorId, CentroDeCusto::new);
		Unidade unidade = buscarOuVazio(unidadeId, unidadeService::buscarPorId, Unidade::new);

		return tuplas(relatorioService.porCentroDeCusto(centroDeCusto, dataInicio, dataFim, unidade));
	}

	@GetMapping("/por-vencimento")
	public List<Object[]> porVencimento(
			@RequestParam(required = false) Long tipoContratoId,
			@RequestParam(required = false) Long centroDeCustoId,
			@RequestParam(required = false) Long unidadeId) {

		TipoContrato tipoContrato = buscarOuVazio(tipoContratoId, tipoContratoService::buscarPorId, TipoContrato::new);
		CentroDeCusto centroDeCusto = buscarOuVazio(centroDeCustoId, centroCustoService::buscarPorId, CentroDeCusto::new);
		Unidade unidade = buscarOuVazio(unidadeId, unidadeService::buscarPorId, Unidade::new);

		return tuplas(relatorioService.porVencimento(tipoContrato, centroDeCusto, unidade));
	}

	private <T> T buscarOuVazio(Long id, java.util.function.Function<Long, T> busca, java.util.function.Supplier<T> vazio) {
		return id != null ? busca.apply(id) : vazio.get();
	}

	private List<Object[]> tuplas(List<Tuple> tuplas) {
		List<Object[]> resultado = new java.util.ArrayList<>();
		for (Object registro : tuplas) {
			if (registro instanceof Tuple tuple) {
				resultado.add(tuple.toArray());
			} else if (registro instanceof Object[] array) {
				resultado.add(array);
			} else {
				resultado.add(new Object[] { registro });
			}
		}
		return resultado;
	}
}
