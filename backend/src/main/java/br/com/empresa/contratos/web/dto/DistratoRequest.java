package br.com.empresa.contratos.web.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record DistratoRequest(
		@NotBlank @Size(max = 30) String codigoDistrato,
		LocalDate dataDistrato,
		@NotBlank @Size(max = 60) String responsavel,
		String observacoes) {
}
