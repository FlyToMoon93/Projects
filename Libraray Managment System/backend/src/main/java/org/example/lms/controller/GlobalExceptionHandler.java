package org.example.lms.controller;

import org.example.lms.exception.EmailAlreadyInUseException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EmailAlreadyInUseException.class)
    public ResponseEntity<String> handleEmailAlreadyInUseException(EmailAlreadyInUseException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }

    @ExceptionHandler({ DataIntegrityViolationException.class, DuplicateKeyException.class })
    public ResponseEntity<String> handleDataIntegrityViolationException(RuntimeException e) {
        if (e.getCause() != null && e.getCause().getMessage().contains("Duplicate entry")) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already in use");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
    }
}
