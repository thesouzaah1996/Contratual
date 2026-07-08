package br.com.empresa.contratos.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UnidadeRequest(
		@NotBlank @Size(max = 60) String nome,
		@NotNull Integer site,
		@NotBlank @Size(max = 20) String dimensaoAx,
		@NotBlank @Size(max = 18) String cnpj,
		boolean inativo,
		boolean matriz,
		@NotNull Long empresaId) {
}
