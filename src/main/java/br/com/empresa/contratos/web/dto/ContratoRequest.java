package br.com.empresa.contratos.web.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ContratoRequest(
		@NotNull Long tipoContratoId,
		@Size(max = 20) String tipoEspecifico,
		@NotNull Long contraparteId,
		@NotNull Long departamentoId,
		@NotNull Long unidadeId,
		@NotNull Long centroDeCustoId,
		@NotNull String emissor,
		boolean possuiDocumento,
		@NotNull LocalDate dataInicio,
		LocalDate dataFim,
		boolean renovacaoAutomatica,
		String observacoes,
		@NotBlank @Size(max = 9) String codigoProcesso,
		@Size(max = 30) String codigoContrato,
		@NotBlank @Size(max = 60) String responsavel,
		@NotNull BigDecimal valor,
		Integer fidelidade) {
}
