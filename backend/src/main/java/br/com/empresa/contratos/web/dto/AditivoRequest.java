package br.com.empresa.contratos.web.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AditivoRequest(
		@NotBlank @Size(max = 30) String codigoAditivo,
		LocalDate dataInicioAditivo,
		LocalDate dataFimAditivo,
		Integer fidelidade,
		boolean renovacaoAutomatica,
		@NotNull BigDecimal valor,
		@NotBlank @Size(max = 60) String responsavel,
		String observacoes) {
}
