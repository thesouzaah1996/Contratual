package br.com.empresa.contratos.web.controllers;

import java.util.Arrays;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.empresa.contratos.models.Emissor;
import br.com.empresa.contratos.models.TipoEntidade;
import br.com.empresa.contratos.models.TipoResgistro;

@RestController
@RequestMapping("/api/enums")
public class EnumsController {

	@GetMapping
	public Map<String, Object> listar() {
		return Map.of(
				"emissores", Arrays.stream(Emissor.values())
						.map(e -> Map.of("sigla", e.getSigla(), "descricao", e.getDescricao())).toList(),
				"tiposEntidade", Arrays.stream(TipoEntidade.values())
						.map(e -> Map.of("sigla", e.getSigla(), "descricao", e.getDescricao())).toList(),
				"tiposRegistro", Arrays.stream(TipoResgistro.values())
						.map(t -> Map.of("sigla", t.name(), "descricao", t.getDescricao())).toList());
	}
}
