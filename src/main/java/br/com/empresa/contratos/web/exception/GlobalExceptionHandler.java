package br.com.empresa.contratos.web.exception;

import java.util.HashMap;
import java.util.Map;

import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.NoResultException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler({ NoResultException.class, EntityNotFoundException.class })
	public ResponseEntity<Map<String, String>> handleNotFound(RuntimeException ex) {
		Map<String, String> body = new HashMap<>();
		body.put("mensagem", "Registro não encontrado");
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(body);
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Map<String, String>> handleValidation(MethodArgumentNotValidException ex) {
		Map<String, String> erros = new HashMap<>();
		ex.getBindingResult().getFieldErrors().forEach(erro -> erros.put(erro.getField(), erro.getDefaultMessage()));
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(erros);
	}

	@ExceptionHandler(IllegalArgumentException.class)
	public ResponseEntity<Map<String, String>> handleIllegalArgument(IllegalArgumentException ex) {
		Map<String, String> body = new HashMap<>();
		body.put("mensagem", ex.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
	}
}
